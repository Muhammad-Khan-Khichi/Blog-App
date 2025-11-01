import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button";
import RTE from "../RTE";
import Select from "../container/Select";
import appwriteService from "../../appwrite/config";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await appwriteService.uploadFile(data.image[0]);
      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase().replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
  }, []);

  React.useEffect(() => {
    watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
  }, [watch, slugTransform, setValue]);

  return (
   <form
  onSubmit={handleSubmit(submit)}
  className="flex flex-wrap bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-8 gap-8"
>
  {/* Left Section */}
  <div className="w-full md:w-2/3 px-2 space-y-6">
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Title
      </label>
      <input
        placeholder="Enter post title"
        className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 
                   focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
        {...register("title", { required: true })}
      />
    </div>

    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Slug
      </label>
      <input
        placeholder="Enter slug"
        className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 
                   focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
        {...register("slug", { required: true })}
        onInput={(e) =>
          setValue("slug", slugTransform(e.currentTarget.value), {
            shouldValidate: true,
          })
        }
      />
    </div>

    <div className="bg-white/20 p-4 rounded-xl border border-white/30">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Content
      </label>
      <RTE
        label="Content"
        name="content"
        control={control}
        defaultValue={getValues("content")}
      />
    </div>
  </div>

  {/* Right Section */}
  <div className="w-full md:w-1/3 px-2 space-y-6">
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Featured Image
      </label>
      <input
        type="file"
        accept="image/png, image/jpg, image/jpeg, image/webp"
        className="w-full text-gray-800 file:mr-4 file:py-2 file:px-4 file:rounded-xl 
                   file:border-0 file:text-sm file:font-semibold 
                   file:bg-indigo-600 file:text-white hover:file:bg-indigo-500 
                   transition duration-300"
        {...register("image", { required: !post })}
      />
    </div>

    {post && (
      <div className="w-full">
        <img
          src={appwriteService.getFilePreview(post.featuredImage)}
          alt="Featured"
          className="rounded-xl shadow-lg border border-gray-200 object-cover"
        />
      </div>
    )}

    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Status
      </label>
      <Select
        options={["active", "inactive"]}
        label="Status"
        className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-800 
                   focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
        {...register("status", { required: true })}
      />
    </div>

    <Button
      type="submit"
      bgColor={
        post
          ? "bg-green-500 hover:bg-green-400"
          : "bg-indigo-600 hover:bg-indigo-500"
      }
      className="w-full cursor-pointer text-white font-semibold py-3 rounded-xl 
                 transition-all duration-300 shadow-lg hover:shadow-indigo-300/30 active:scale-95"
    >
      {post ? "Update" : "Submit"}
    </Button>
  </div>
</form>

  );
}

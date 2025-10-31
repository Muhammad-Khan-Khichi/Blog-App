import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import Container from "../components/container/Container";
import PostCard from "../components/PostCard";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full py-16 bg-gray-50 min-h-[70vh] flex items-center justify-center">
        <Container>
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <h1 className="text-3xl font-bold text-gray-800">
              Login to Read Posts 📖
            </h1>
            <p className="text-gray-500 max-w-md">
              Discover insightful posts, share your thoughts, and connect with
              like-minded readers once you log in.
            </p>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-12 bg-gray-50 min-h-[80vh]">
      <Container>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Latest Posts
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {posts.map((post) => (
            <div
              className="p-2 transition transform hover:-translate-y-1 hover:shadow-xl duration-300"
              key={post.$id}
            >
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;

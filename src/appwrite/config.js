import { Client, Databases, Storage, Query, ID, Permission, Role } from "appwrite";
import conf from "../conf/conf.js";

class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  // 🧩 Get a single post by slug
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.error("Appwrite service :: getPost() ::", error);
      return false;
    }
  }

  // 🧩 Get all active posts
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.error("Appwrite service :: getPosts() ::", error);
      return false;
    }
  }

  // 🧩 Create new post
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        },
        [
          Permission.read(Role.any()),         // anyone can read
          Permission.write(Role.user(userId)), // only creator can edit/delete
        ]
      );
    } catch (error) {
      console.error("Appwrite service :: createPost() ::", error);
      return false;
    }
  }

  // 🧩 Update post
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.error("Appwrite service :: updatePost() ::", error);
      return false;
    }
  }

  // 🧩 Delete post
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.error("Appwrite service :: deletePost() ::", error);
      return false;
    }
  }

  // 🧩 Upload file with proper permissions
  async uploadFile(file, userId) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file,
        [
          Permission.read(Role.any()),        // anyone can view
          Permission.write(Role.user(userId)) // only uploader can modify/delete
        ]
      );
    } catch (error) {
      console.error("Appwrite service :: uploadFile() ::", error);
      return false;
    }
  }

  // 🧩 Delete file
  async deleteFile(fileId) {
    try {
      return await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
    } catch (error) {
      console.error("Appwrite service :: deleteFile() ::", error);
      return false;
    }
  }

  // 🧩 Get file preview URL
  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteBucketId, fileId).href;
  }
}

const service = new Service();
export default service;

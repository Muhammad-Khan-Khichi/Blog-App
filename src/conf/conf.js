const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1'),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID || "68eca0c1000f275ab94c"),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID || "68eca228003a29bf2fbc"),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID || "blogs"),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID || "68eca7de001d83d28c21"),
}

export default conf
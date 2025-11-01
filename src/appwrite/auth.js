import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl) // Your Appwrite endpoint
      .setProject(conf.appwriteProjectId); // Your project ID

    this.account = new Account(this.client);
  }

  // 🧩 Create a new account
  async createAccount({ email, password, name }) {
    try {
      // Create user account
      const userAccount = await this.account.create(ID.unique(), email, password, name);

      // Automatically log in user after signup
      if (userAccount) {
        return await this.login({ email, password });
      }

      return userAccount;
    } catch (error) {
      console.error("AuthService :: createAccount() ::", error);
      throw new Error(error?.message || "Signup failed. Please try again.");
    }
  }

  // 🧩 Login user (handles existing session safely)
  async login({ email, password }) {
    try {
      // Check if a session already exists
      try {
        const current = await this.account.get();
        if (current) {
          await this.account.deleteSession("current"); // Safely end current session
        }
      } catch (_) {
        // No active session — safe to continue
      }

      // Create new session
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.error("AuthService :: login() ::", error);
      throw new Error(error?.message || "Login failed. Please check credentials.");
    }
  }

  // 🧩 Get current user (returns null if not logged in)
  async getCurrentUser() {
    try {
      const user = await this.account.get();
      return user || null;
    } catch (error) {
      // No active session or invalid token
      console.warn("AuthService :: getCurrentUser() :: No active session");
      return null;
    }
  }

  // 🧩 Logout current user
  async logout() {
    try {
      await this.account.deleteSession("current"); // end only current session
    } catch (error) {
      console.error("AuthService :: logout() ::", error);
    }
  }

  // 🧩 Logout all sessions (optional helper)
  async logoutAll() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.error("AuthService :: logoutAll() ::", error);
    }
  }
}

const authService = new AuthService();
export default authService;

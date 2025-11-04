import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    // Initialize Appwrite client
    this.client
      .setEndpoint(conf.appwriteUrl) // Your Appwrite endpoint
      .setProject(conf.appwriteProjectId); // Your project ID

    // Initialize Account service with the same client
    this.account = new Account(this.client);
  }

  // 🧩 Create a new account and auto-login
  async createAccount({ email, password, name }) {
    try {
      // Create the user account
      const userAccount = await this.account.create(ID.unique(), email, password, name);

      // Auto-login after signup
      if (userAccount) {
        await this.login({ email, password });
      }

      return userAccount;
    } catch (error) {
      console.error("AuthService :: createAccount() ::", error);
      throw new Error(error?.message || "Signup failed. Please try again.");
    }
  }

  // 🧩 Login user (creates a session)
  async login({ email, password }) {
    try {
      // Ensure no existing session is active
      try {
        const current = await this.account.get();
        if (current) {
          await this.account.deleteSession("current");
        }
      } catch (_) {
        // No active session, safe to continue
      }

      // Create new session (Appwrite v1.5+)
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.error("AuthService :: login() ::", error);
      throw new Error(error?.message || "Login failed. Please check credentials.");
    }
  }

  // 🧩 Create anonymous session (useful for guest uploads)
  async createAnonymousSession() {
    try {
      return await this.account.createAnonymousSession();
    } catch (error) {
      console.error("AuthService :: createAnonymousSession() ::", error);
      throw new Error(error?.message || "Failed to create anonymous session.");
    }
  }

  // 🧩 Get current user (returns null if not logged in)
  async getCurrentUser() {
    try {
      const user = await this.account.get();
      return user || null;
    } catch (error) {
      console.warn("AuthService :: getCurrentUser() :: No active session");
      return null;
    }
  }

  // 🧩 Logout current session
  async logout() {
    try {
      await this.account.deleteSession("current");
    } catch (error) {
      console.error("AuthService :: logout() ::", error);
    }
  }

  // 🧩 Logout from all sessions
  async logoutAll() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.error("AuthService :: logoutAll() ::", error);
    }
  }
}

// ✅ Export a single shared instance
const authService = new AuthService();
export default authService;

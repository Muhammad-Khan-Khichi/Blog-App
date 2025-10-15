import conf from "../conf/conf"
import { Client, Account, ID } from "appwrite"

export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client)
    }
    
    async createAccount({email, password, name}){
        try {
            const userId = ID.unique();
            const userAccount = await this.account.create(
                userId,
                 email,
                password,
                name
                )
            if (userAccount) {
                return this.login({email, password})
            }else{
                return userAccount
            }
        } catch(error){
            console.error("AuthService :: Signup() ::", error.message)
            throw new Error("Login Failed. Server Error.")
        }
    }
    async login({email, password}){
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            console.error("AuthService :: login() ::", error.message)
            throw new Error("Login Failed. Please check your credentials.")
        }
    }
    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser() :: ", error);
            
        }
        return null
    }
    async logout(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
             console.log("Appwrite service :: logout() :: ", error);
        }
    }
}

const authService =  new AuthService()

export default authService
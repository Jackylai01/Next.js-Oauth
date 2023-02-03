import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongo from "../../../database/conn";
import Users from "../../../model/UserSchema";
import { compare } from "bcryptjs";

export default NextAuth({
  providers: [
    //Google Provider
    GoogleProvider({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        //credentials 可以看成req.body的資料跟一些邏輯處理的設定
        //單一路由連結mongodb，登入
        connectMongo().catch((err) => {
          err: "Connection Failed..";
        });

        //檢查OAuth 登入的信箱，在本地端資料庫是否存在
        const result = await Users.findOne({ email: credentials.email }); //.req.body.email 前台發送的登入請求
        if (!result) {
          throw new Error("沒有找到用戶，請註冊");
        }

        //比較密碼req.body的密碼跟資料庫的密碼是否一致
        const checkPassword = await compare(
          credentials.password,
          result.password
        );

        //如果密碼不一致，或信箱不一致都會丟出錯誤
        if (!checkPassword || result.email !== credentials.email) {
          throw new Error("找不到使用者名稱或密碼");
        }
        return result;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
});

import Credentials from "next-auth/providers/credentials";
import NextAuth, {CredentialsSignin} from "next-auth";
import connectDb from "./lib/connectDb";

class InvalidLoginError extends CredentialsSignin {
  code = "password"
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // console.log("pepek", credentials);
        // const user = {
        //   id: 1,
        //   name: "Razha",
        //   email: "razhajamsiksyah@gmail.com",
        // };
        // if (
        //   credentials.email === "razhajamsiksyah@gmail.com" &&
        //   credentials.password === "razha90"
        // ) {
        //   return user;
        // } else {
        //   // throw new InvalidLoginError()
        //   throw new InvalidLoginError();
        // }
        await connectDb();
        const { email, password, name, phone_number, gender } = credentials;
        
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  session: {
    jwt: true,
    maxAge: 60 * 60 * 24 * 4,
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 4,
    updateAge: 60 * 60 * 24,
  },
  secret: process.env.NEXTAUTH_SECRET,
});

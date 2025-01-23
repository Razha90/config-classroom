import Credentials from "next-auth/providers/credentials";
import NextAuth, {CredentialsSignin} from "next-auth";
import connectDb from "./lib/connectDb";
import User from "./schema/user";

class InvalidLoginError extends CredentialsSignin {
  constructor(code) {
    super();
    this.code = code;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  // adapter: MongoDBAdapter(client),
  // adapter: Mongo
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
        const { email, password } = credentials;
        if (!email || !password) {
          throw new InvalidLoginError("MISSING_CREDENTIALS");
        }
        try {
          await connectDb();
        } catch (error) {
          throw new InvalidLoginError("SERVER_ERROR");
        }
        try {
        const user = await User.findOne({ email });
          if(!user) {
            throw new InvalidLoginError("USER_NOT_FOUND");
          }
          const passwordMatch = await user.matchPassword(password);
          if (!passwordMatch) {
            throw new InvalidLoginError("MATCH_ACCOUNT");
          }
          return { id: user._id, name: user.name };
        } catch (error) {
          throw new InvalidLoginError("SERVER_ERROR");
        }
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

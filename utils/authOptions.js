import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/config/database";
import User from "@/models/User";
import { getServerSession } from "next-auth/next";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    // Invoked on successful sign in
    async signIn({ profile }) {
      //1. Connect to the database
      await connectDB();
      //2. Check if user exists
      const userExists = await User.findOne({ email: profile.email });
      //3. if not, create user
      if (!userExists) {
        // Truncate username if too long
        const username = profile.name.slice(0, 20);

        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
        });
      }
      // 4. Return true to allow sign in
      return true;
    },
    // Session callback function that modifies the session object
    async session({ session }) {
      // 1. Get the user from the database
      const user = await User.findOne({ email: session.user.email });
      // 2. Asign the user id from the session
      session.user.id = user._id.toString();
      // 3. Return the session
      return session;
    },
  },
};

export const getSessionUser = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) return null;
    return {
      userId: session.user.id,
      email: session.user.email,
    };
  } catch (error) {
    console.error("Error getting session:", error);
    return null;
  }
};

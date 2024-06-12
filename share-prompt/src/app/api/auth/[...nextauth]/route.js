import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/utils/dbConnect";
import User from "@/models/user";
const handlder = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    //Whenever a session is created or accessed, the session callback is called.
    //The session callback extracts data from the JWT and populates the session.user object.
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser.id.toString();
      return session;
    },
    //This callback is called whenever a user tries to sign in. It allows you to control
    // whether or not the user is allowed to sign in.
    //the profile object contains the user profile information returned by the OAuth provider
    // during the authentication process.
    async signIn({ profile }) {
      try {
        await connectDB();
        const userExists = await User.findOne({ email: profile.email });
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile?.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }
        return true; //allows signin
        //If the sign-in is successful, the jwt callback is called.
        // Here, you can customize the JWT by adding custom claims or modifying existing ones.
        //The data from the OAuth provider (e.g., user profile information) can be stored in the JWT.
      } catch (error) {
        console.log("Error : ", error);
      }
    },
  },
});

export { handlder as GET, handlder as POST };

import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
    ],
    callbacks: {
        async signIn({ user }) {
            // Whitelist check
            const allowedEmail = "istvan.kuti.jr@gmail.com";
            if (user.email === allowedEmail) {
                return true;
            }
            return false; // Return false to deny access
        },
    },
    pages: {
        signIn: '/login', // Custom login page
    },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

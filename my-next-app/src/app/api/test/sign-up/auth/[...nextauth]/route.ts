import NextAuth from "next-auth/next";
import { authOptions } from "./options";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
// This file handles the NextAuth authentication routes for both GET and POST requests.
// It uses the authOptions defined in the options.ts file to configure the authentication providers and callbacks.
// The GET and POST methods are exported to handle authentication requests from the client side.

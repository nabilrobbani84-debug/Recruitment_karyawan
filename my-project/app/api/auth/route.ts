// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize(credentials) {
//         // Here, you would typically query your database or external service
//         // For demonstration, let's mock a successful login if email and password match
//         if (
//           credentials?.email === "user@example.com" &&
//           credentials?.password === "password123"
//         ) {
//           return {
//             id: "1",
//             name: "John Doe",
//             email: credentials.email,
//           };
//         }
//         return null; // Invalid credentials
//       }
//     })
//   ],

//   // Optional: Pages for handling redirects
//   pages: {
//     signIn: "/auth/signin", // Your custom sign-in page
//     error: "/auth/error",   // Custom error page
//   },

//   callbacks: {
//     // Handles the JWT token
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.email = user.email;
//       }
//       return token;
//     },
//     // Manage session data for the user
//     async session({ session, token }) {
//       if (token) {
//         session.user.id = token.id;
//         session.user.email = token.email;
//       }
//       return session;
//     }
//   },

//   secret: process.env.NEXTAUTH_SECRET, // JWT secret key for signing
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };

import next from "next";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
const handler = NextAuth({
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            name: "strapi",
            credentials: {
                Email: { label: "Email", type: "Email"},
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
            // Add logic here to look up the user from the credentials supplied
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/auth/local`,
                    { 
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ 
                            identifier: credentials.email,
                            password: credentials.password,
                        }),
                    }
                )
                const data = await res.json();

                console.log("Strapi user response:", data.user);

                if (!res.ok || !data.jwt)
                    throw new Error(data.error?.message || "Login failed");

                // return user object to be saved in session

                return{
                    id: data.user.id,
                    name: data.user.username,
                    email: data.user.email,
                    FirstName: data.user.FirstName,
                    LastName: data.user.LastName,
                    jwt: data.jwt
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            // Persist the OAuth access_token to the token right after signin
            if (user) {
                token.jwt = user.jwt;
                token.id = user.id;
                token.FirstName = user.FirstName;
                token.LastName = user.LastName;
            }
            return token;
        },
        async session({ session, token }) {
            // Send properties to the client, like an access_token from a provider.
            session.user.id = token.id;
            session.jwt = token.jwt;
            session.user.FirstName = token.FirstName;
            session.user.LastName = token.LastName;
            return session;
        },
    },
    pages: {
        signIn: "/login", // custom login page
    },
    secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
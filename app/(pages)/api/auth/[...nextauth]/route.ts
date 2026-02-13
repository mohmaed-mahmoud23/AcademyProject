import NextAuth, { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" },
        rememberMe: { label: "rememberMe", type: "checkbox" },
      },
 async authorize(credentials) {
  if (!credentials?.username || !credentials?.password) return null;

  try {
    const res = await fetch("http://localhost:7012/api/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: credentials.username,
        password: credentials.password,
        rememberMe: true,
      }),
    });

    if (!res.ok) return null;

    const json = await res.json();

    // هنا ناخد الـ data جوه الـ response
    const userData = json.data;

    if (userData && userData.accessToken) {
      return {
        id: userData.accessToken, // ممكن تستخدم accessToken كـ id
        name: credentials.username, // أو أي اسم تحبه
        email: credentials.username,
        roles: userData.roles,
      };
    }

    return null;
  } catch (err: any) {
    console.error("Authorize fetch error:", err.message || err);
    return null;
  }
}

    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }: { session: any; token: JWT }) {
      if (token) {
        session.user = {
          id: token.id as string,
          name: token.name as string,
          email: token.email as string,
        };
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  debug: true,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };


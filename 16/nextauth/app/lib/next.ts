import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        console.log(credentials);
        return {
          id: "iser1",
          name: "user1",
          email: "password1",
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  // callbacks: {
  //   signIn: ({ user }: { user: any }) => {
  //     if (user.email === "randomperson@gmail.com") {
  //       return false;
  //     }
  //     return true;
  //   },
  // },
  callbacks: {
    jwt: ({ token, user }: { token: any; user: any }) => {
      console.log(token);
      token.userId = "ajfka";
      token.type = "admin";
      return token;
    },
  },
};

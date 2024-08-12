import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connection from "../../../dataBaseLogin.mjs";
import { RowDataPacket } from 'mysql2';

interface User {
  id: string;
  email: string;
}

interface UserFromDB extends RowDataPacket {
  id: string;
  email: string;
  password: string;
}

const handler = NextAuth({
  pages: {
    signIn: "/"
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("Credenciais não fornecidas");
        }

        const { email, password } = credentials;

        if (!email || !password) {
          throw new Error("Email ou senha não fornecidos");
        }

        async function getUser(email: string, password: string): Promise<UserFromDB | null> {
          const [rows]: [UserFromDB[], any] = await connection.execute('SELECT id, email, password FROM users WHERE email = ? AND password = ?', [email, password]);
          return rows.length > 0 ? rows[0] : null;
        }

        try {
          const verify = await getUser(email, password);
          console.log("Resultado da consulta:", verify);

          if (!verify) {
            console.log("Usuário não encontrado");
            return null;
          }

          const userObject: User = {
            id: verify.id,
            email: verify.email,
          };

          return userObject;

        } catch (err) {
          console.error(err);
          return null;
        }
      }
    })
  ]
});

export { handler as GET, handler as POST };

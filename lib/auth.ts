import { db } from '@/utils/db';
import { users } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import { fetchAndStoreRepositories } from './repoManagement';

export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      profile(profile) {
        return {
          id: profile.id,
          name: profile.login,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      try {
        const existingUser = await db
          .select()
          .from(users)
          .where(eq(users.githubId, user.id));

        if (!existingUser.length) {
          const newUser = {
            githubId: user.id ?? '',
            name: user.name ?? '',
            email: user.email ?? '',
            avatarUrl: user.image ?? '',
          };
          await db.insert(users).values(newUser);
          await fetchAndStoreRepositories(newUser);
        }
      } catch (error) {
        console.error('Database Error:', error);
        return false;
      }

      return true;
    },
    async session({ session, token, user }) {
      if (token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
};

import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  githubId: text('github_id').notNull(),
  name: text('name'),
  email: text('email').notNull(),
  avatarUrl: text('avatar_url'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const repositories = pgTable('repositories', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),
  repoName: text('repo_name').notNull(),
  status: text('status').notNull(),
  lastUpdated: timestamp('last_updated').notNull(),
  createdAt: timestamp('created_at').notNull(),
});

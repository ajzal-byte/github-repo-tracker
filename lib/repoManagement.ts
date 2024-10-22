import { db } from '@/utils/db';
import { repositories } from '@/utils/schema';
import { Repository, User } from '@/utils/types';
import { desc, eq } from 'drizzle-orm';

export async function fetchAndStoreRepositories(user: User) {
  try {
    const res = await fetch(`https://api.github.com/users/${user.name}/repos`);
    const repos = await res.json();

    for (const repo of repos) {
      await db.insert(repositories).values({
        userId: user.githubId,
        repoName: repo.name,
        status: repo.private ? 'private' : 'public',
        lastUpdated: new Date(repo.updated_at),
        createdAt: new Date(repo.created_at),
      });
    }
  } catch (error) {
    console.error('Error fetching/storing repositories:', error);
  }
}

export const getUserRepositories = async (userId: string) => {
  const repos = await db
    .select()
    .from(repositories)
    .where(eq(repositories.userId, userId))
    .orderBy(desc(repositories.createdAt));

  return repos;
};

export const getTotalCommitsByUser = async (
  username: string | null | undefined,
  repositories: Repository[],
): Promise<number> => {
  let totalCommits = 0;

  for (const repo of repositories) {
    const commitsUrl = `https://api.github.com/repos/${username}/${repo.repoName}/commits`;
    const commitsResponse = await fetch(commitsUrl, {
      headers: {
        Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (commitsResponse.status === 404) {
      console.error(`Repository not found: ${repo.repoName}`);
      continue;
    }

    if (!commitsResponse.ok) {
      if (commitsResponse.status === 403) {
        console.error('Rate limit exceeded. Please wait and try again later.');
        return totalCommits;
      }
      console.error(
        `Error fetching commits for ${repo.repoName}:`,
        commitsResponse.statusText,
      );
      continue;
    }

    const commitsData = await commitsResponse.json();
    totalCommits += commitsData.length;
  }

  return totalCommits;
};

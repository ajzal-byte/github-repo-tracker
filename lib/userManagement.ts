import { db } from '@/utils/db';
import { repositories } from '@/utils/schema';
import { User } from '@/utils/types';

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

    console.log('Repositories stored successfully');
  } catch (error) {
    console.error('Error fetching/storing repositories:', error);
  }
}

import { RepoTable, Sidebar, StatsCards } from '../_components';
import { Input } from '@/components/ui/input';
import { authOptions } from '@/lib/auth';
import {
  getTotalCommitsByUser,
  getUserRepositories,
} from '@/lib/repoManagement';
import { getCachedData, setCachedData } from '@/utils/storageUtils';
import { Repository } from '@/utils/types';
import { Search } from 'lucide-react';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard example using Next.js 14',
};

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  const repositories: Repository[] = await getUserRepositories(session.user.id);

  // TODO: to implement real time commits
  // const cachedCommitsKey = `totalCommits_${session.user.id}`;
  // const maxCacheAge = 24 * 60 * 60 * 1000;

  // let totalCommits = getCachedData(cachedCommitsKey, maxCacheAge);

  // if (totalCommits === null) {
  //   totalCommits = await getTotalCommitsByUser(session.user.name, repositories);
  //   setCachedData(cachedCommitsKey, totalCommits);
  // }

  const stats = [
    {
      title: 'Total Repositories',
      value: repositories.length,
      change: '16%',
      icon: 'profiles' as const,
      changeType: 'up' as const,
    },
    {
      title: 'Total Commits',
      value: 500,
      change: '1%',
      icon: 'profile-tick' as const,
      changeType: 'down' as const,
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar username={session?.user.name} profile={session.user.image} />
      <div className="flex-grow p-4 sm:p-6 lg:p-8 lg:ml-64 ml-16 transition-all duration-300 ease-in-out">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8">
          <h1 className="text-2xl font-medium mb-4 sm:mb-0">
            Hello {session?.user?.name} 👋,
          </h1>
          <div className="relative w-full sm:w-auto">
            <Input
              type="text"
              placeholder="Search"
              className="pl-10 w-full sm:max-w-56 border-none rounded-xl"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>
        </div>
        <div className="mb-6 sm:mb-8 w-full max-w-2xl">
          <StatsCards stats={stats} />
        </div>
        <RepoTable repositories={repositories} />
      </div>
    </div>
  );
}

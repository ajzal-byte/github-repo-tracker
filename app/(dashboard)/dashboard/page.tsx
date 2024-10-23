import { RepoTable, Sidebar, StatCard } from '../_components';
import { Input } from '@/components/ui/input';
import { authOptions } from '@/lib/auth';
import {
  getTotalCommitsByUser,
  getUserRepositories,
} from '@/lib/repoManagement';
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
  const totalCommits = await getTotalCommitsByUser(
    session?.user?.name,
    repositories,
  );
  console.log(totalCommits);

  return (
    <div className="flex">
      <Sidebar username={session?.user.name} profile={session.user.image} />
      <div className="flex-grow p-8 ml-64">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-medium">
            Hello {session?.user?.name} 👋,
          </h1>
          <div className="relative">
            <Input
              type="text"
              placeholder="Search"
              className="pl-10 max-w-56 border-none rounded-xl"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-8 mb-8">
          <StatCard
            icon="profiles"
            title="Total Repositories"
            value={repositories.length}
            change="+16%"
          />
          <StatCard
            icon="profile-tick"
            title="Total commits"
            value={totalCommits}
            change="-1%"
          />
        </div>
        <RepoTable repositories={repositories} />
      </div>
    </div>
  );
}

export interface User {
  githubId: string;
  name: string;
  email: string | null;
  avatarUrl: string | null;
}

export interface BaseStat {
  title: string;
  value: string | number;
  change: string;
  icon: 'profiles' | 'profile-tick';
  changeType: 'up' | 'down';
}

export interface StatsCardsProps {
  stats: BaseStat[];
}

export interface StatsCardProps extends BaseStat {
  isLast?: boolean;
}

export interface Repository {
  id: number;
  createdAt: Date;
  userId: string;
  repoName: string;
  status: string;
  lastUpdated: Date;
}

export interface RepositoryTableProps {
  repositories: Repository[];
}

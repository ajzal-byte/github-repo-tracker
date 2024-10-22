export interface User {
  githubId: string;
  name: string;
  email: string | null;
  avatarUrl: string | null;
}

export interface StatCardProps {
  icon: string;
  title: string;
  value: number;
  change: string;
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

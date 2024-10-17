export interface User {
  githubId: string;
  name: string;
  email: string | null;
  avatarUrl: string | null;
}

export interface StatCardProps {
  icon: string;
  title: string;
  value: string;
  change: string;
}

export interface Repository {
  name: string
  status: 'Private' | 'Public'
  updated: string
  created: string
}

export interface RepositoryTableProps {
  repositories: Repository[]
}
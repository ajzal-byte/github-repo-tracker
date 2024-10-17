'use client';

import { RepoTable, Sidebar, StatCard } from '../_components';
import { Input } from '@/components/ui/input';
import { Repository } from '@/utils/types';
import { Search } from 'lucide-react';
import { useState } from 'react';

export default function Dashboard() {
  const [repositories] = useState<Repository[]>([
    {
      name: 'Project Alpha',
      status: 'Public',
      updated: '2024-10-01',
      created: '2023-05-15',
    },
    {
      name: 'Project Beta',
      status: 'Private',
      updated: '2024-09-20',
      created: '2022-11-10',
    },
    {
      name: 'Project Gamma',
      status: 'Public',
      updated: '2024-10-05',
      created: '2023-02-20',
    },
    {
      name: 'Project Delta',
      status: 'Private',
      updated: '2024-08-30',
      created: '2021-06-25',
    },
    {
      name: 'Project Epsilon',
      status: 'Public',
      updated: '2024-10-10',
      created: '2023-01-05',
    },
    {
      name: 'Project Zeta',
      status: 'Private',
      updated: '2024-09-15',
      created: '2022-03-30',
    },
    {
      name: 'Project Eta',
      status: 'Public',
      updated: '2024-10-12',
      created: '2023-07-19',
    },
    {
      name: 'Project Theta',
      status: 'Private',
      updated: '2024-09-25',
      created: '2021-12-01',
    },
  ]);
  

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-8 ml-64">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Hello Evano 👋,</h1>
          <div className="relative">
            <Input type="text" placeholder="Search" className="pl-10" />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-8 mb-8">
          <StatCard
            icon="profiles"
            title="Total Customers"
            value="5,423"
            change="+16%"
          />
          <StatCard
            icon="profile-tick"
            title="Members"
            value="1,893"
            change="-1%"
          />
        </div>
        <RepoTable repositories={repositories} />
      </div>
    </div>
  );
}

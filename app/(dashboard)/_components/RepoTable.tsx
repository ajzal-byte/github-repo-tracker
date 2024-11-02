'use client';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { RepositoryTableProps } from '@/utils/types';
import { format, formatDistanceToNow } from 'date-fns';
import { ChevronDown, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import React, { useState, useMemo } from 'react';

const RepoTable: React.FC<RepositoryTableProps> = ({ repositories }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<
    'newest' | 'oldest' | 'recently-updated'
  >('newest');

  const filteredAndSortedRepos = useMemo(() => {
    return repositories
      .filter((repo) =>
        repo.repoName.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      .sort((a, b) => {
        switch (sortOrder) {
          case 'oldest':
            return (
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            );
          case 'recently-updated':
            return (
              new Date(b.lastUpdated).getTime() -
              new Date(a.lastUpdated).getTime()
            );
          case 'newest':
          default:
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
        }
      });
  }, [repositories, searchQuery, sortOrder]);

  const pageCount = Math.ceil(filteredAndSortedRepos.length / 10);
  const paginatedRepos = filteredAndSortedRepos.slice(
    (currentPage - 1) * 10,
    currentPage * 10,
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg overflow-x-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
        <div className="flex flex-col">
          <h2 className="text-[22px] font-semibold mb-1">All Repositories</h2>
          <p className="text-[#16C098] text-sm">Active Members</p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
          <div className="relative flex-grow w-full sm:w-auto">
            <Input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full sm:max-w-60 text-[#b5b7c0] bg-[#f9fbff] border-none rounded-xl"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8b8b8b]"
              size={20}
            />
          </div>
          <div className="flex items-center w-full sm:w-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="text-gray-700 font-semibold bg-[#f9fbff] border-none rounded-xl w-full sm:w-auto">
                  <span className="text-sm font-normal text-[#7e7e7e]">
                    Sort by:
                  </span>
                  {sortOrder === 'newest'
                    ? 'Newest'
                    : sortOrder === 'oldest'
                    ? 'Oldest'
                    : 'Recently Updated'}
                  <ChevronDown size={16} className="ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onSelect={() => setSortOrder('newest')}>
                  Newest
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setSortOrder('oldest')}>
                  Oldest
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => setSortOrder('recently-updated')}>
                  Recently Updated
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Button
            variant="ghost"
            className="text-[#7e7e7e] bg-[#f9fbff] border-none rounded-xl w-full sm:w-auto">
            Add repository
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px] text-[#B5B7C0]">Select</TableHead>
              <TableHead className="text-[#B5B7C0]">Name</TableHead>
              <TableHead className="text-[#B5B7C0] hidden sm:table-cell">
                Updated
              </TableHead>
              <TableHead className="text-[#B5B7C0] hidden md:table-cell">
                Created
              </TableHead>
              <TableHead className="text-[#B5B7C0]">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedRepos.map((repo, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell className="font-medium">{repo.repoName}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  {formatDistanceToNow(new Date(repo.lastUpdated), {
                    addSuffix: true,
                  })}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {format(new Date(repo.createdAt), 'do MMMM, yyyy')}
                </TableCell>
                <TableCell className="py-4">
                  <span
                    className={`px-3 py-1 rounded-sm font-medium border-2 ${
                      repo.status === 'public'
                        ? 'bg-[#a6e7d8] text-[#24987d] border-[#00b087]'
                        : 'bg-red-100 text-red-600'
                    }`}>
                    {repo.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 space-y-4 sm:space-y-0">
        <p className="text-gray-500 text-sm">
          Showing {(currentPage - 1) * 10 + 1} to{' '}
          {Math.min(currentPage * 10, filteredAndSortedRepos.length)} of{' '}
          {filteredAndSortedRepos.length} entries
        </p>
        <div className="flex items-center space-x-2 overflow-x-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}>
            <ChevronLeft size={16} />
          </Button>
          {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(page)}
              className={
                page === currentPage ? 'bg-purple-600 text-white' : ''
              }>
              {page}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === pageCount}>
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RepoTable;

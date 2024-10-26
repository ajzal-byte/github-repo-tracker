import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
import { format, formatDistanceToNow, parseISO } from 'date-fns';
import { ChevronDown, ChevronLeft, ChevronRight, Search } from 'lucide-react';

const RepoTable: React.FC<RepositoryTableProps> = ({ repositories }) => (
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
            className="pl-10 w-full sm:max-w-60 text-[#b5b7c0] bg-[#f9fbff] border-none rounded-xl"
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8b8b8b]"
            size={20}
          />
        </div>
        <div className="flex items-center w-full sm:w-auto">
          <Button
            variant="outline"
            className="text-gray-700 font-semibold bg-[#f9fbff] border-none rounded-xl w-full sm:w-auto">
            <span className="text-sm font-normal text-[#7e7e7e]">Sort by:</span>
            Newest <ChevronDown size={16} className="ml-2" />
          </Button>
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
          {repositories.map((repo, index) => (
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
        Showing data 1 to 8 of 256K entries
      </p>
      <div className="flex items-center space-x-2 overflow-x-auto">
        <Button variant="outline" size="sm">
          <ChevronLeft size={16} />
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="bg-purple-600 text-white">
          1
        </Button>
        <Button variant="outline" size="sm">
          2
        </Button>
        <Button variant="outline" size="sm">
          3
        </Button>
        <Button variant="outline" size="sm">
          4
        </Button>
        <span>...</span>
        <Button variant="outline" size="sm">
          40
        </Button>
        <Button variant="outline" size="sm">
          <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  </div>
);

export default RepoTable;

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
  <div className="bg-white p-6 rounded-lg">
    <div className="flex justify-between items-center mb-6">
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold mb-1">All Repositories</h2>
        <p className="text-green-500 text-sm">Active Members</p>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-grow">
          <Input type="text" placeholder="Search" className="pl-10 w-full" />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>
        <div className="flex items-center">
          <span className="mr-2 text-sm text-gray-500">Sort by:</span>
          <Button variant="outline" className="text-gray-700">
            Newest <ChevronDown size={16} className="ml-2" />
          </Button>
        </div>
        <Button variant="ghost" className="ml-4">
          Add repository
        </Button>
      </div>
    </div>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">Select</TableHead>
          <TableHead>Name</TableHead>
          <TableHead className="hidden md:table-cell">Status</TableHead>
          <TableHead className="hidden sm:table-cell">Updated</TableHead>
          <TableHead className="hidden lg:table-cell">Created</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {repositories.map((repo, index) => (
          <TableRow key={index}>
            <TableCell>
              <Checkbox />
            </TableCell>
            <TableCell className="font-medium">{repo.repoName}</TableCell>
            <TableCell className="hidden md:table-cell">
              <span className="px-2 py-1 rounded-full text-xs bg-gray-800 text-white">
                {repo.status}
              </span>
            </TableCell>
            <TableCell className="hidden sm:table-cell">
              {formatDistanceToNow(new Date(repo.lastUpdated), {
                addSuffix: true,
              })}
            </TableCell>
            <TableCell className="hidden lg:table-cell">
              {format(new Date(repo.createdAt), 'do MMMM, yyyy')}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    <div className="flex justify-between items-center mt-4">
      <p className="text-gray-500">Showing data 1 to 8 of 256K entries</p>
      <div className="flex items-center">
        <Button variant="outline" className="mr-2">
          <ChevronLeft size={16} />
        </Button>
        <Button variant="outline" className="bg-purple-600 text-white mr-2">
          1
        </Button>
        <Button variant="outline" className="mr-2">
          2
        </Button>
        <Button variant="outline" className="mr-2">
          3
        </Button>
        <Button variant="outline" className="mr-2">
          4
        </Button>
        <span className="mr-2">...</span>
        <Button variant="outline" className="mr-2">
          40
        </Button>
        <Button variant="outline">
          <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  </div>
);

export default RepoTable;

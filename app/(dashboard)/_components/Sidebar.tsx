import {
  DashboardLargeIcon,
  DashboardIcon,
  ProductIcon,
  CustomersIcon,
  IncomeIcon,
  PromoteIcon,
  HelpIcon,
} from './icons/icons';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronDown } from 'lucide-react';

const Sidebar = ({
  username,
  profile,
}: {
  username: string | null | undefined;
  profile: string | null | undefined;
}) => {
  const menuItems = [
    { name: 'Dashboard', icon: <DashboardIcon /> },
    { name: 'Product', icon: <ProductIcon /> },
    { name: 'Customers', icon: <CustomersIcon /> },
    { name: 'Income', icon: <IncomeIcon /> },
    { name: 'Promote', icon: <PromoteIcon /> },
    { name: 'Help', icon: <HelpIcon /> },
  ];

  return (
    <div className="bg-white flex flex-col h-screen fixed left-0 top-0 transition-all duration-300 ease-in-out lg:w-64 w-16 overflow-hidden">
      <div className="flex items-center mb-8 p-4 lg:p-4">
        <DashboardLargeIcon />
        <div className="items-baseline space-x-1 hidden lg:flex">
          <h1 className="text-[26px] font-bold">Dashboard</h1>
          <span className="text-[10px] text-[#838383]">v.01</span>
        </div>
      </div>

      <nav className="flex-grow">
        {menuItems.map((item, index) => (
          <div
            key={item.name}
            className={`flex items-center p-2 mb-4 rounded-lg cursor-pointer ${
              index === 2
                ? 'bg-[#5932ea] text-white'
                : 'text-gray-500 hover:bg-gray-100'
            } mx-2 space-y-1`}>
            <div className="w-5 h-5 mr-3">{item.icon}</div>
            <span className="hidden lg:inline">{item.name}</span>
            {index !== 0 && (
              <ChevronRight className="ml-auto hidden lg:block" size={16} />
            )}
          </div>
        ))}
      </nav>
      <div className="bg-gradient-to-r from-purple-500 to-[#4f2be9] p-4 rounded-3xl text-white mx-4 mb-6 hidden lg:flex flex-col justify-between w-[220px] h-[145px]">
        <h3 className="font-medium text-center text-sm leading-5 mb-3">
          Upgrade to PRO to get access all Features!
        </h3>
        <Button
          variant="secondary"
          className="w-full bg-white text-[#4925e9] hover:bg-gray-100 rounded-full font-semibold text-sm py-2 px-4">
          Get Pro Now!
        </Button>
      </div>
      <div className="flex items-center p-4">
        <img
          src={
            profile ||
            'https://www.strasys.uk/wp-content/uploads/2022/02/Depositphotos_484354208_S.jpg'
          }
          alt="User"
          className="w-9 h-9 lg:w-10 lg:h-10 rounded-full object-cover mr-3"
        />
        <div className="hidden lg:block">
          <h4 className="font-semibold">{username}</h4>
          <p className="text-xs text-gray-500">Project Manager</p>
        </div>
        <ChevronDown className="ml-auto hidden lg:block" size={16} />
      </div>
    </div>
  );
};

export default Sidebar;

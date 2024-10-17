import { ChevronRight, ChevronDown } from 'lucide-react';
import { DashboardIcon, ProductIcon, CustomersIcon, IncomeIcon, PromoteIcon, HelpIcon } from './icons/icons';
import { Button } from '@/components/ui/button';

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', icon: <DashboardIcon /> },
    { name: 'Product', icon: <ProductIcon /> },
    { name: 'Customers', icon: <CustomersIcon /> },
    { name: 'Income', icon: <IncomeIcon /> },
    { name: 'Promote', icon: <PromoteIcon /> },
    { name: 'Help', icon: <HelpIcon /> },
  ];

  return (
    <div className="w-64 bg-white p-4 flex flex-col h-screen fixed left-0 top-0">
      <div className="flex items-center mb-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-bolt">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <circle cx="12" cy="12" r="4" />
        </svg>
        <h1 className="text-xl font-bold">Dashboard</h1>
        <span className="text-xs text-gray-400 ml-1">v.01</span>
      </div>
      <nav className="flex-grow">
        {menuItems.map((item, index) => (
          <div
            key={item.name}
            className={`flex items-center p-2 mb-2 rounded-lg ${
              index === 2
                ? 'bg-purple-600 text-white'
                : 'text-gray-500 hover:bg-gray-100'
            }`}>
            <div className="w-5 h-5 mr-3">{item.icon}</div>
            {item.name}
            {index !== 0 && <ChevronRight className="ml-auto" size={16} />}
          </div>
        ))}
      </nav>
      <div className="bg-gradient-to-r from-purple-500 to-[#4f2be9] p-4 rounded-2xl text-white">
        <h3 className="font-bold mb-2">
          Upgrade to PRO to get access all Features!
        </h3>
        <Button
          variant="secondary"
          className="w-full bg-white text-[#4925e9] hover:bg-gray-100 rounded-full font-bold">
          Get Pro Now!
        </Button>
      </div>
      <div className="flex items-center mt-4">
        <img
          src="/placeholder.svg?height=40&width=40"
          alt="User"
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <h4 className="font-semibold">Evano</h4>
          <p className="text-xs text-gray-500">Project Manager</p>
        </div>
        <ChevronDown className="ml-auto" size={16} />
      </div>
    </div>
  );
};

export default Sidebar;

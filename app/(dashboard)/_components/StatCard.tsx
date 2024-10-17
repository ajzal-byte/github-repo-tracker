import { ProfilesIcon, ProfileTickIcon } from './icons/icons';
import { StatCardProps } from '@/utils/types';

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, change }) => {
  const renderIcon = () => {
    switch (icon) {
      case 'profiles':
        return <ProfilesIcon />;
      case 'profile-tick':
        return <ProfileTickIcon />;
      default:
        return;
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg flex items-center">
      <div className="w-16 h-16 rounded-full flex items-center justify-center mr-4 bg-green-100">
        {renderIcon()}
      </div>
      <div>
        <h3 className="text-gray-500 mb-1">{title}</h3>
        <p className="text-2xl font-bold mb-1">{value}</p>
        <p
          className={`text-sm ${
            change.startsWith('+') ? 'text-green-500' : 'text-red-500'
          }`}>
          {change}
          <span className='text-[#292d32]'> this month</span>
        </p>
      </div>
    </div>
  );
};

export default StatCard;

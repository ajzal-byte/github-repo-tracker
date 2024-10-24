import { ProfilesIcon, ProfileTickIcon } from './icons/icons';
import { StatsCardProps, StatsCardsProps } from '@/utils/types';
import { ArrowUp, ArrowDown } from 'lucide-react';

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  icon,
  isLast,
  changeType,
}) => {
  const renderIcon = () => {
    switch (icon) {
      case 'profiles':
        return <ProfilesIcon />;
      case 'profile-tick':
        return <ProfileTickIcon />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex items-center gap-6 px-4">
        <div className="w-[84px] h-[84px] rounded-full flex items-center justify-center bg-[#E7F9F0]">
          {renderIcon()}
        </div>
        <div className="flex flex-col">
          <h3 className="text-[#98A2B3] text-[14px] font-normal mb-1">
            {title}
          </h3>
          <p className="text-[32px] text-[#333333] font-semibold leading-[34px] mb-1">
            {value}
          </p>
          <p className="flex items-center gap-1 text-sm">
            <span
              className={`flex items-center font-bold ${
                changeType === 'up' ? 'text-[#00ac4f]' : 'text-[#d0004b]'
              }`}>
              {changeType === 'up' ? (
                <ArrowUp className="text-sm" />
              ) : (
                <ArrowDown />
              )}{' '}
              {change}
            </span>
            <span className="text-[#292d32] font-normal">
              this month
            </span>
          </p>
        </div>
      </div>
      {!isLast && <div className="w-[1px] h-[88px] bg-[#EAECF0] mx-6" />}
    </>
  );
};

const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  return (
    <div className="bg-white p-6 rounded-[20px] flex items-center shadow-sm w-full">
      {stats.map((stat, index) => (
        <StatsCard
          key={stat.title}
          {...stat}
          isLast={index === stats.length - 1}
        />
      ))}
    </div>
  );
};

export default StatsCards;

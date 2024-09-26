import PolicyManagement from '@/components/sections/client-dashboard/policy-management/PolicyManagement';
import SocialMedia from '@/components/sections/client-dashboard/social-media/SocialMedia';

export default function PremiumFeature() {
  return (
    <>
      <div className="w-full text-start space-y-4 p-6 bg-white shadow rounded-2xl ">
        <div className="text-[#1B1B1B] font-semibold text-lg md:text-[21px] text-center">
        Personalize
        </div>
        <PolicyManagement />
      </div>
      <div className="w-full text-start space-y-4 p-6 bg-white shadow rounded-2xl ">
        <div className="text-[#1B1B1B] font-semibold text-lg md:text-[21px] text-center">
        Social Media
        </div>
        <SocialMedia />

      </div>
      <div className="w-full text-start space-y-4 p-6 bg-white shadow rounded-2xl ">
        <div className="text-[#1B1B1B] font-semibold text-lg md:text-[21px] text-center">
        Special Rates (Only for Premium Users)
        </div>
      </div>
      
    </>
  );
}

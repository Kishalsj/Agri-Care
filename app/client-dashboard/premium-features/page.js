import PremiumFeature from "@/components/sections/client-dashboard/premium-features/PremiumFeature";

export default async function PremiumFeaturesPage() {

  return (
    <div className="w-full space-y-4 pb-[300px]">
      <div className="items-start w-full text-[#002248] flex flex-col justify-start flex-1">
        <div className="p-4 md:p-6 text-center bg-white shadow-md rounded-2xl items-start text-sm md:text-base justify-start w-full flex flex-col space-y-2">
          <span className="text-[#1B1B1B] text-center text-lg md:text-xl font-bold">
            Premium Features
          </span>

          <div className="flex flex-col">
            <span> </span>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <PremiumFeature  />
      </div>
    </div>
  );
}

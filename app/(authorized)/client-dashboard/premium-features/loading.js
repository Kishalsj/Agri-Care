import InfoIcon from "@/components/icons/InfoIcon";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center  rounded-md animate-pulse">
      <div className="items-start w-full text-[#002248] flex flex-col p-6 bg-white shadow rounded-2xl mb-4 justify-start">
        <div className="  items-start text-[12px] justify-start px-0 flex flex-col gap-2 ">
          <span className="text-[#1B1B1B]  text-[21px] font-bold">
          Premium Features
          </span>
        </div>
      </div>
      
    </div>
  );
}

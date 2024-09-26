import InfoIcon from "@/components/icons/InfoIcon";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center  rounded-md animate-pulse">
      <div className="items-start w-full text-[#002248] flex flex-col p-6 bg-white shadow rounded-2xl mb-4 justify-start">
        <div className="  items-start text-[12px] justify-start px-0 flex flex-col gap-2 ">
          <span className="text-[#1B1B1B]  text-[21px] font-bold">
            Loyalty Program
          </span>
        </div>
      </div>
      <div className="w-full px-[25%] py-10 bg-white rounded-2xl shadow ">
        <div className=" text-[#c0d0e1] justify-center items-center px-0 md:px-2 flex flex-col gap-2 py-3 mt-4 space-y-2">
          <InfoIcon color="#000" width={35} height={35} />
          <div className="justify-center font-bold flex text-[#002248]">
            No Programs yet
          </div>
          <div className="text-[#5C6A7A] flex justify-center">
            Add a Program and it will show up here.
          </div>
          <button className="bg-[#1893F8] rounded-full px-6 font-bold py-2 text-white">
            Add Program
          </button>
        </div>
      </div>
    </div>
  );
}

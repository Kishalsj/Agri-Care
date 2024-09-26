export default function Loading() {
  return (
    <div className="flex flex-col space-y-5 relative p-10 content-center items-center justify-center lg:w-10/12 mx-auto animate-pulse">
      <div className="flex w-full relative bg-gray-100 rounded-2xl p-4 h-[492px]">
        <div className="bg-white rounded-2xl p-4 shadow w-full"></div>
      </div>
      <div className="flex flex-col w-full relative bg-gray-100 rounded-2xl p-4 h-[217px] space-y-4">
        <div className="bg-white rounded-2xl p-4 shadow w-full flex-1"></div>
        <div className="bg-white rounded-2xl p-4 shadow w-full h-[64px]"></div>
      </div>
    </div>
  );
}

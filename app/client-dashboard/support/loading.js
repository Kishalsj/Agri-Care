export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center  rounded-md animate-pulse">
      <div className="items-start w-full text-[#002248] flex flex-col p-6 bg-white shadow rounded-2xl mb-4 justify-start">
        <div className="  items-start text-[12px] justify-start px-0 flex flex-col gap-2 ">
          <span className="text-[#1B1B1B]  text-[21px] font-bold">
            Contact Support
          </span>
        </div>
      </div>
      <div className="p-6 bg-white shadow rounded-2xl w-full">
        <div className="text-center w-full">
          <div className="w-full text-start flex flex-col h-[200px] sm:h-[400px] overflow-y-auto rounded-t-2xl space-y-2"></div>
        </div>
        <form className="w-full p-4 bg-gray-100 border-[1px] rounded-2xl shadow">
          <div className="w-full">
            <label
              htmlFor="message"
              className="text-[#697687] text-[12px] hidden"
            >
              New Message
            </label>
            <textarea
              id="message"
              className="border w-full border-gray-300 rounded-md px-2 py-2"
              rows="4"
              placeholder="Please type your message…. "
            ></textarea>
          </div>
          <div className="flex justify-between">
            <button className="rounded-full mt-3 px-6 border-[#1D1A4E] border-[1px] py-2 text-[#1D1A4E]">
              Clear History
            </button>
            <button
              className="bg-[#1893F8] rounded-full mt-3 px-6 font-bold py-2 text-white"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

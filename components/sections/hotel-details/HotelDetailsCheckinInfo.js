export default function HotelDetailsCheckinInfo({ checkinInfo, checkoutInfo }) {
  return (
    <>
      {checkinInfo?.beginTime && (
        <div className="container shadow bg-gray-100 rounded-2xl p-4 font-Montserrat">
          <div className="bg-white rounded-2xl p-4 shadow grid grid-flow-row md:grid-cols-2 relative">
            <h3 className="text-2xl font-bold mb-2">Check-in & Check-out</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-2">
                <span className="font-bold">Check-in</span>
                <span className="text-[#5C6A7A]">{checkinInfo.beginTime}</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-bold">Check-out</span>
                <span className="text-[#5C6A7A]">{checkoutInfo.time}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

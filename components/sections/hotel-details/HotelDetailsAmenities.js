export default function HotelDetailsAmenities({ facilities = [] }) {
  return (
    <div id="amenities" className="bg-gray-100 rounded-2xl p-4 font-Montserrat">
      <div className="grid grid-flow-row md:grid-cols-2 relative mx-auto bg-white rounded-2xl shadow p-4">
        <h3 className="text-2xl font-bold mb-2">Property Amenities in Detail</h3>
        <div className="flex flex-col gap-4">
          <ul className="justify-between gap-3 grid grid-cols-2">
            {facilities.length > 0 ? (
              facilities.map((amenity) => (
                <li className="flex flex-row justify-between" key={amenity.id}>
                  {amenity.name}
                </li>
              ))
            ) : (
              <div>No Amenities</div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

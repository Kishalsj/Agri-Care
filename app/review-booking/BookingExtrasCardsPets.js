import React, { useState } from "react";

const PetsCard = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [animalType, setAnimalType] = useState("dog");

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleAnimalTypeChange = (type) => {
    setAnimalType(type);
  };



  return (
    <div className="border rounded-lg shadow-lg p-4 mb-6 hover:border-blue-300 transition-colors duration-300">
      {/* Header Section */}
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={handleToggleExpand}
      >
        <div className="flex items-center space-x-2 gap-4">
          <input type="checkbox" className="form-checkbox h-6 w-6 text-blue-600 cursor-pointer rounded-full" />
          <div className="flex items-center space-x-2">
            {/* Parking Icon */}
            <div className="bg-gray-300 p-1 rounded-xl h-10 w-10">
            <svg
                fill="#000000"
                viewBox="-1 0 19 19"
                xmlns="http://www.w3.org/2000/svg"
                className="cf-icon-svg h-8 w-8"
            >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                <path d="M16.417 9.579A7.917 7.917 0 1 1 8.5 1.662a7.917 7.917 0 0 1 7.917 7.917zm-11.293.252A1.31 1.31 0 0 0 5.648 8.1c-.267-.76-.934-1.22-1.49-1.024a1.31 1.31 0 0 0-.524 1.73c.267.761.934 1.22 1.49 1.025zm6.664.747a4.606 4.606 0 0 0-6.518 0 1.945 1.945 0 0 0 2.75 2.75.72.72 0 0 1 1.017 0 1.945 1.945 0 0 0 2.75-2.75zM5.84 6.986c.087.918.7 1.61 1.372 1.547.67-.064 1.143-.86 1.057-1.777-.087-.917-.701-1.61-1.372-1.546-.67.063-1.144.859-1.057 1.776zm4.003 1.547c.671.063 1.285-.63 1.372-1.547.087-.917-.386-1.713-1.057-1.776-.67-.064-1.285.629-1.372 1.546-.086.918.387 1.713 1.057 1.777zM12.9 7.076c-.556-.195-1.223.263-1.49 1.024a1.31 1.31 0 0 0 .524 1.73c.556.196 1.223-.263 1.49-1.024a1.31 1.31 0 0 0-.524-1.73z"></path>
                </g>
            </svg>
            </div>

            <span className="text-lg font-semibold">Pet Care</span>
          </div>
        </div>
        <div>
          <span className="text-gray-500">{isExpanded ? "▲" : "▼"}</span>
        </div>
      </div>

      {/* Expandable Section */}
      {isExpanded && (
        <div className="mt-4">
          {/* Vehicle Type Section */}
          <div className="mb-4">
    <h4 className="font-semibold mb-2">Pet Type</h4>
    <div className="flex space-x-16">

        {/* Dog Option */}
                    <label
            className={`flex flex-col items-center justify-center space-y-2 p-4 border rounded-md cursor-pointer hover:border-blue-300 transition-colors duration-300 ${animalType === "dog" ? 'border-blue-600' : ''}`}
            onClick={() => handleAnimalTypeChange("dog")}
            aria-label="Select Motorcycle"
            >
            <div className="bg-blue-100 p-2 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="w-10 h-10">
                <path d="M309.6 158.5L332.7 19.8C334.6 8.4 344.5 0 356.1 0c7.5 0 14.5 3.5 19 9.5L392 32l52.1 0c12.7 0 24.9 5.1 33.9 14.1L496 64l56 0c13.3 0 24 10.7 24 24l0 24c0 44.2-35.8 80-80 80l-32 0-16 0-21.3 0-5.1 30.5-112-64zM416 256.1L416 480c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-115.2c-24 12.3-51.2 19.2-80 19.2s-56-6.9-80-19.2L160 480c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-230.2c-28.8-10.9-51.4-35.3-59.2-66.5L1 167.8c-4.3-17.1 6.1-34.5 23.3-38.8s34.5 6.1 38.8 23.3l3.9 15.5C70.5 182 83.3 192 98 192l30 0 16 0 159.8 0L416 256.1zM464 80a16 16 0 1 0 -32 0 16 16 0 1 0 32 0z"/>
                </svg>
            </div>
            <span className="mt-2">Dog</span>
            <input
                type="radio"
                value="dog"
                checked={animalType === "dog"}
                onChange={() => setAnimalType("dog")}
                className="form-radio"
            />
            </label>


                {/* Cat Option */}
                <label
  className={`flex flex-col items-center justify-center space-y-2 p-4 border rounded-md cursor-pointer hover:border-blue-300 transition-colors duration-300 ${animalType === "cat" ? 'border-blue-600' : ''}`}
  onClick={() => handleAnimalTypeChange("cat")}
  aria-label="Select cat"
>
  <div className="bg-blue-100 p-2 rounded-full flex items-center justify-center">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="w-10 h-10">
      <path d="M320 192l17.1 0c22.1 38.3 63.5 64 110.9 64c11 0 21.8-1.4 32-4l0 4 0 32 0 192c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-140.8L280 448l56 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-144 0c-53 0-96-43-96-96l0-223.5c0-16.1-12-29.8-28-31.8l-7.9-1c-17.5-2.2-30-18.2-27.8-35.7s18.2-30 35.7-27.8l7.9 1c48 6 84.1 46.8 84.1 95.3l0 85.3c34.4-51.7 93.2-85.8 160-85.8zm160 26.5s0 0 0 0c-10 3.5-20.8 5.5-32 5.5c-28.4 0-54-12.4-71.6-32c0 0 0 0 0 0c-3.7-4.1-7-8.5-9.9-13.2C357.3 164 352 146.6 352 128c0 0 0 0 0 0l0-96 0-20 0-1.3C352 4.8 356.7 .1 362.6 0l.2 0c3.3 0 6.4 1.6 8.4 4.2c0 0 0 0 0 .1L384 21.3l27.2 36.3L416 64l64 0 4.8-6.4L512 21.3 524.8 4.3c0 0 0 0 0-.1c2-2.6 5.1-4.2 8.4-4.2l.2 0C539.3 .1 544 4.8 544 10.7l0 1.3 0 20 0 96c0 17.3-4.6 33.6-12.6 47.6c-11.3 19.8-29.6 35.2-51.4 42.9zM432 128a16 16 0 1 0 -32 0 16 16 0 1 0 32 0zm48 16a16 16 0 1 0 0-32 16 16 0 1 0 0 32z"/>
    </svg>
  </div>
  <span className="mt-2">Cat</span>
  <input
    type="radio"
    value="cat"
    checked={animalType === "cat"}
    onChange={() => setAnimalType("cat")}
    className="form-radio"
  />
</label>

                

            </div>
            </div>



          {/* Place Type Section */}
         
        </div>
      )}
    </div>
  );
};

export default PetsCard;

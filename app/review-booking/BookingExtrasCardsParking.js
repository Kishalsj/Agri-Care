import React, { useState } from "react";

const ParkingCard = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [vehicleType, setVehicleType] = useState("car");
  const [placeType, setPlaceType] = useState("default");

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleVehicleTypeChange = (type) => {
    setVehicleType(type);
  };

  const handlePlaceTypeChange = (type) => {
    setPlaceType(type);
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
            <div className="bg-gray-300 p-1 rounded-xl h-10 w-10 ">
              <svg
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
                className="h-8 w-8"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <g id="parking-circle" transform="translate(-2 -2)">
                    <circle
                      id="secondary"
                      fill="#ffffff"
                      cx="9"
                      cy="9"
                      r="9"
                      transform="translate(3 3)"
                    ></circle>
                    <path
                      id="primary"
                      d="M10,13h3.5A2.5,2.5,0,0,0,16,10.5h0A2.5,2.5,0,0,0,13.5,8H10v8"
                      fill="none"
                      stroke="#3341ff"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                    ></path>
                    <circle
                      id="primary-2"
                      data-name="primary"
                      cx="9"
                      cy="9"
                      r="9"
                      transform="translate(3 3)"
                      fill="none"
                      stroke="#3341ff"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                    ></circle>
                  </g>
                </g>
              </svg>
            </div>
            <span className="text-lg font-semibold">Car Park</span>
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
    <h4 className="font-semibold mb-2">Vehicle Type</h4>
    <div className="flex space-x-16">

        {/* Motorcycle Option */}
             <label
                className={`flex flex-col items-center justify-center space-y-2 p-4 border rounded-md cursor-pointer hover:border-blue-300 transition-colors duration-300 ${vehicleType === "motorcycle" ? 'border-blue-600' : ''}`}
                onClick={() => handleVehicleTypeChange("motorcycle")}
                aria-label="Select Motorcycle"
              >
            <div className="bg-blue-100 p-2 rounded-full flex items-center justify-center">
                <svg
                id="Layer_1"
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 81.13 122.88"
                className="w-10 h-10"
                >
                <title>scooter-vespa-moped</title>
                <path d="M34.08,22.83l.09.07h0l.08.06.08.07,0,0,.06,0,.08.07,0,0,0,0,.09.07.07.05h0l.09.06.16.11h0l.09.06,0,0,.06,0,.09.06.05,0,0,0,.1.06.07,0h0l.09.06.1,0h0l.09.05.1.05h0l.07,0,.09.05.06,0,0,0,.1.05.08,0h0l.1.05.1,0h0l.1,0,.1,0,0,0,.07,0,.1,0,.06,0,0,0,.1,0,.08,0h0l.11,0,.1,0h0l.11,0,.1,0h0l.08,0,.11,0,0,0h.05l.11,0,.08,0h0l.22.05h0l.11,0,.1,0h.11l.11,0h.12l.11,0h.11l.22,0h0l.23,0h0l.25,0h1l.25,0h0l.23,0h0l.22,0h.12l.11,0h.11l.11,0h.11l.11,0,.11,0h0l.22-.05h0l.08,0,.11,0h0l.06,0,.11,0h0l.1,0,.11,0,.1,0h0l.11,0,.1,0h0l.09,0,.1,0,.05,0,0,0,.1,0,.08,0,0,0,.11,0,.09,0h0l.1,0,.1-.05h0l.07,0,.1-.05.05,0,0,0,.1-.05.07,0h0l.1-.05.09-.05h0l.09,0,.09-.06h0l.08,0,.09-.06,0,0,0,0,.09-.06.07,0,0,0,.08-.06h0l.16-.11.09-.06h0l.07-.05.09-.07,0,0,0,0,.09-.07.06,0,0,0,.08-.07.08-.06h0l.08-.07a10.05,10.05,0,1,0-13,0Zm4.35,15.49a2.13,2.13,0,1,1,4.26,0V57.84a2.13,2.13,0,1,1-4.26,0V38.32Zm-5.64,66.35h15.4v10.51a7.72,7.72,0,0,1-7.7,7.7h0a7.72,7.72,0,0,1-7.7-7.7V104.67Zm5-33.74h5.34A11.88,11.88,0,0,1,55,82.79v17a2,2,0,0,1-2,2H28a2,2,0,0,1-2-2v-17A11.88,11.88,0,0,1,37.82,70.93Zm5.34,4H37.82A7.89,7.89,0,0,0,30,82.79v15H51v-15a7.89,7.89,0,0,0-7.87-7.87ZM55.21,23.14A20.39,20.39,0,0,1,72,43.12v37.6A20.4,20.4,0,0,1,61.17,98.64v-5A16.31,16.31,0,0,0,63,92a16,16,0,0,0,4.71-11.31V43.12a16.08,16.08,0,0,0-16-16H50.63a15.18,15.18,0,0,1-9.67,3,16.77,16.77,0,0,1-10.3-3A16.05,16.05,0,0,0,16.25,43.12v37.6A15.91,15.91,0,0,0,20,90.94v5.87a17.9,17.9,0,0,1-2-1.77l-.12-.12A20.25,20.25,0,0,1,12,80.72V43.12a20.18,20.18,0,0,1,6-14.32h0a20.39,20.39,0,0,1,8.56-5.12c-2.12-1.86-4.33-3.39-8.13-3.39H5.21A5.22,5.22,0,0,1,0,15.08H0a5.22,5.22,0,0,1,5.21-5.2H18.38C28,9.86,27.47,0,41,0,53.25,0,53.2,9.86,62.74,9.86H75.92a5.22,5.22,0,0,1,5.21,5.2h0a5.22,5.22,0,0,1-5.21,5.2H62.74a11,11,0,0,0-7.53,2.86Z"/>
                </svg>
            </div>
            <span className="mt-2">Motorcycle</span>
            <input
                type="radio"
                value="motorcycle"
                checked={vehicleType === "motorcycle"}
                onChange={() => setVehicleType("motorcycle")}
                className="form-radio"
            />
            </label>

                {/* Car Option with Icon in a Box */}
                <label
                className={`flex flex-col items-center justify-center space-y-2 p-4 border rounded-md cursor-pointer hover:border-blue-300 transition-colors duration-300 ${vehicleType === "car" ? 'border-blue-600' : ''}`}
                onClick={() => handleVehicleTypeChange("car")}
                aria-label="Select car"
              > 
              <div className="bg-blue-100 p-2 rounded-full flex items-center justify-center">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 122.88 92.02"
                    fill="#000000"
                    className="w-10 h-10"
                    >
                    <style type="text/css">
                        {`.st0{fill-rule:evenodd;clip-rule:evenodd;}`}
                    </style>
                    <g>
                        <path
                        className="st0"
                        d="M10.17,34.23c-10.98-5.58-9.72-11.8,1.31-11.15l2.47,4.63l5.09-15.83C21.04,5.65,24.37,0,30.9,0H96 
                        c6.53,0,10.29,5.54,11.87,11.87l3.82,15.35l2.2-4.14c11.34-0.66,12.35,5.93,0.35,11.62l1.95,2.99
                        c7.89,8.11,7.15,22.45,5.92,42.48v8.14c0,2.04-1.67,3.71-3.71,3.71h-15.83c-2.04,0-3.71-1.67-3.71-3.71v-4.54H24.04v4.54
                        c0,2.04-1.67,3.71-3.71,3.71H4.5c-2.04,0-3.71-1.67-3.71-3.71V78.2c0-0.2,0.02-0.39,0.04-0.58C-0.37,62.25-2.06,42.15,
                        10.17,34.23L10.17,34.23z M30.38,58.7l-14.06-1.77c-3.32-0.37-4.21,1.03-3.08,3.89l1.52,3.69c0.49,0.95,1.14,1.64,1.9,
                        2.12c0.89,0.55,1.96,0.82,3.15,0.87l12.54,0.1c3.03-0.01,4.34-1.22,3.39-4C34.96,60.99,33.18,59.35,30.38,58.7L30.38,
                        58.7z M54.38,52.79h14.4c0.85,0,1.55,0.7,1.55,1.55l0,0c0,0.85-0.7,1.55-1.55,1.55h-14.4c-0.85,0-1.55-0.7-1.55-1.55l0,
                        0C52.82,53.49,53.52,52.79,54.38,52.79L54.38,52.79z M89.96,73.15h14.4c0.85,0,1.55,0.7,1.55,1.55l0,0c0,0.85-0.7,1.55-1.55,
                        1.55h-14.4c-0.85,0-1.55-0.7-1.55-1.55l0,0C88.41,73.85,89.1,73.15,89.96,73.15L89.96,73.15z M92.5,58.7l14.06-1.77c3.32-0.37,
                        4.21,1.03,3.08,3.89l-1.52,3.69c-0.49,0.95-1.14,1.64-1.9,2.12c-0.89,0.55-1.96,0.82-3.15,0.87l-12.54,0.1c-3.03-0.01-4.34-1.22-3.39-4
                        C87.92,60.99,89.7,59.35,92.5,58.7L92.5,58.7z M18.41,73.15h14.4c0.85,0,1.55,0.7,1.55,1.55l0,0c0,0.85-0.7,1.55-1.55,1.55h-14.4
                        c-0.85,0-1.55-0.7-1.55-1.55l0,0C16.86,73.85,17.56,73.15,18.41,73.15L18.41,73.15z M19.23,31.2h86.82l-3.83-15.92c-1.05-4.85-4.07-9.05-9.05-9.05H33.06
                        c-4.97,0-7.52,4.31-9.05,9.05L19.23,31.2v0.75V31.2L19.23,31.2z"
                        />
                    </g>
                    </svg>
                </div>
                <span className="mt-2">Car</span>
                <input
                    type="radio"
                    value="car"
                    checked={vehicleType === "car"}
                    onChange={() => setVehicleType("car")}
                    className="form-radio"
                />
                </label>

                {/* Bus Option */}
                <label
                className={`flex flex-col items-center justify-center space-y-2 p-4 border rounded-md cursor-pointer hover:border-blue-300 transition-colors duration-300 ${vehicleType === "bus" ? 'border-blue-600' : ''}`}
                onClick={() => handleVehicleTypeChange("bus")}
                aria-label="Select bus"
              > <div className="bg-blue-100 p-2 rounded-full flex items-center justify-center">
                <svg
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 122.9 120.5"
                style={{ enableBackground: "new 0 0 122.9 120.5" }}
                xmlSpace="preserve"
                className="w-10 h-10"
                >
                <style type="text/css">
                    {`.st0{fill-rule:evenodd;clip-rule:evenodd;}`}
                </style>
                <g>
                    <path
                    className="st0"
                    d="M110.8,103.6h-7.6V114c0,3.6-2.9,6.5-6.5,6.5h-9c-3.6,0-6.5-2.9-6.5-6.5v-10.3H41.5V114c0,3.6-2.9,6.5-6.5,6.5 h-9c-3.6,0-6.5-2.9-6.5-6.5v-10.3H12v-82c0-7.6,4.4-13.1,13.3-16.5c17.6-6.9,54.6-6.9,72.3,0c8.9,3.4,13.3,8.9,13.3,16.5V103.6 L110.8,103.6L110.8,103.6z M118.6,40.4h-3.8V62h3.8c2.4,0,4.3-1.9,4.3-4.3V44.7C122.9,42.3,121,40.4,118.6,40.4L118.6,40.4z M4.3,40.4h3.8V62H4.3C1.9,62,0,60.1,0,57.7V44.7C0,42.3,1.9,40.4,4.3,40.4L4.3,40.4z M46.4,8.6h30.1c0.9,0,1.6,0.7,1.6,1.6v5.2 c0,0.9-0.7,1.6-1.6,1.6H46.4c-0.9,0-1.6-0.7-1.6-1.6v-5.2C44.8,9.3,45.5,8.6,46.4,8.6L46.4,8.6z M22.9,23.2h76.7 c1,0,1.9,0.9,1.9,1.9v42.8c0,1-0.9,1.9-1.9,1.9H22.9c-1,0-1.9-0.9-1.9-1.9V25.1C21,24.1,21.8,23.2,22.9,23.2L22.9,23.2 L22.9,23.2 L22.9,23.2z M98.6,84.9c0-1.9-0.7-3.6-2-4.9c-1.3-1.3-3-2-4.9-2c-1.9,0-3.5,0.7-4.9,2c-1.4,1.3-2,3-2,4.9c0,1.9,0.7,3.5,2,4.8 c1.4,1.3,3,2,4.9,2c1.9,0,3.6-0.7,4.9-2C98,88.4,98.6,86.8,98.6,84.9L98.6,84.9L98.6,84.9L98.6,84.9z M38.1,84.9 c0-1.9-0.7-3.6-2-4.9c-1.3-1.3-3-2-4.9-2c-1.9,0-3.6,0.7-4.9,2c-1.3,1.3-2,3-2,4.9c0,1.9,0.6,3.5,2,4.8c1.3,1.3,3,2,4.9,2 c2,0,3.6-0.7,4.9-2C37.4,88.4,38.1,86.8,38.1,84.9L38.1,84.9L38.1,84.9L38.1,84.9z"
                    />
                </g>
                </svg>
            </div>
            <span className="mt-2">Bus</span>
            <input
                type="radio"
                value="bus"
                checked={vehicleType === "bus"}
                onChange={() => setVehicleType("bus")}
                className="form-radio"
            />
            </label>

            </div>
            </div>



          {/* Place Type Section */}
          <div>
            <h4 className="font-semibold mb-2">Place Type</h4>
            <div className="flex space-x-4">
                 {/* Default  */}
                 <label
                className={`flex flex-col items-center justify-center space-y-2 p-4 border rounded-md cursor-pointer hover:border-blue-300 transition-colors duration-300 ${placeType === "default" ? 'border-blue-600' : ''}`}
                onClick={() => handlePlaceTypeChange("default")}
                aria-label="Select default"
              > <div className="bg-blue-100 p-2 rounded-full flex items-center justify-center">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 122.88 92.02"
                    fill="#000000"
                    className="w-10 h-10"
                    >
                    <style type="text/css">
                        {`.st0{fill-rule:evenodd;clip-rule:evenodd;}`}
                    </style>
                    <g>
                        <path
                        className="st0"
                        d="M10.17,34.23c-10.98-5.58-9.72-11.8,1.31-11.15l2.47,4.63l5.09-15.83C21.04,5.65,24.37,0,30.9,0H96 
                        c6.53,0,10.29,5.54,11.87,11.87l3.82,15.35l2.2-4.14c11.34-0.66,12.35,5.93,0.35,11.62l1.95,2.99
                        c7.89,8.11,7.15,22.45,5.92,42.48v8.14c0,2.04-1.67,3.71-3.71,3.71h-15.83c-2.04,0-3.71-1.67-3.71-3.71v-4.54H24.04v4.54
                        c0,2.04-1.67,3.71-3.71,3.71H4.5c-2.04,0-3.71-1.67-3.71-3.71V78.2c0-0.2,0.02-0.39,0.04-0.58C-0.37,62.25-2.06,42.15,
                        10.17,34.23L10.17,34.23z M30.38,58.7l-14.06-1.77c-3.32-0.37-4.21,1.03-3.08,3.89l1.52,3.69c0.49,0.95,1.14,1.64,1.9,
                        2.12c0.89,0.55,1.96,0.82,3.15,0.87l12.54,0.1c3.03-0.01,4.34-1.22,3.39-4C34.96,60.99,33.18,59.35,30.38,58.7L30.38,
                        58.7z M54.38,52.79h14.4c0.85,0,1.55,0.7,1.55,1.55l0,0c0,0.85-0.7,1.55-1.55,1.55h-14.4c-0.85,0-1.55-0.7-1.55-1.55l0,
                        0C52.82,53.49,53.52,52.79,54.38,52.79L54.38,52.79z M89.96,73.15h14.4c0.85,0,1.55,0.7,1.55,1.55l0,0c0,0.85-0.7,1.55-1.55,
                        1.55h-14.4c-0.85,0-1.55-0.7-1.55-1.55l0,0C88.41,73.85,89.1,73.15,89.96,73.15L89.96,73.15z M92.5,58.7l14.06-1.77c3.32-0.37,
                        4.21,1.03,3.08,3.89l-1.52,3.69c-0.49,0.95-1.14,1.64-1.9,2.12c-0.89,0.55-1.96,0.82-3.15,0.87l-12.54,0.1c-3.03-0.01-4.34-1.22-3.39-4
                        C87.92,60.99,89.7,59.35,92.5,58.7L92.5,58.7z M18.41,73.15h14.4c0.85,0,1.55,0.7,1.55,1.55l0,0c0,0.85-0.7,1.55-1.55,1.55h-14.4
                        c-0.85,0-1.55-0.7-1.55-1.55l0,0C16.86,73.85,17.56,73.15,18.41,73.15L18.41,73.15z M19.23,31.2h86.82l-3.83-15.92c-1.05-4.85-4.07-9.05-9.05-9.05H33.06
                        c-4.97,0-7.52,4.31-9.05,9.05L19.23,31.2v0.75V31.2L19.23,31.2z"
                        />
                    </g>
                    </svg>
                </div>
                <span className="mt-2">Default</span>
                <input
                    type="radio"
                    value="default"
                    checked={placeType === "default"}
                    onChange={() => setPlaceType("default")}
                    className="form-radio"
                />
                </label>

             {/* Disabled  */}
              
              
             <label
                className={`flex flex-col items-center justify-center space-y-2 p-4 border rounded-md cursor-pointer hover:border-blue-300 transition-colors duration-300 ${placeType === "disabled" ? 'border-blue-600' : ''}`}
                onClick={() => handlePlaceTypeChange("disabled")}
                aria-label="Select disabled"
              > <div className="bg-blue-100 p-2 rounded-full flex items-center justify-center">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 95.77 122.88"
                    style={{ enableBackground: 'new 0 0 95.77 122.88' }}
                    xmlSpace="preserve"
                    className="w-10 h-10"
                    >
                    <style type="text/css">
                        {`.st0{fill-rule:evenodd;clip-rule:evenodd;}`}
                    </style>
                    <g>
                        <path
                        className="st0"
                        d="M72.52,67.74c2.52,5.1,3.94,10.84,3.94,16.92c0,9.45-3.43,18.11-9.12,24.78l-8.64-8.64 c3.51-4.44,5.6-10.05,5.6-16.15c0-14.4-11.67-26.07-26.07-26.07c-6.1,0-11.71,2.09-16.15,5.6l-8.63-8.63 c5.32-4.54,11.91-7.64,19.16-8.71l-0.13-0.06l17.18-18.79l-10.48-6.47L27.05,33.07c-2.86,2.72-7.38,2.61-10.1-0.25 c-2.72-2.86-2.61-7.38,0.25-10.1L33.3,7.39l-0.01-0.01c2.56-2.44,6.48-2.61,9.22-0.56l22.63,13.96c0.3,0.19,0.59,0.39,0.86,0.62 l6.3,3.35c6.82,3.63,7.39,10,2.24,15.75L62.5,53.94l25.66-1.6v-0.01c3.94-0.25,7.34,2.76,7.59,6.7c0.01,0.15,0.02,0.31,0.02,0.46 c0,0.3-0.02,0.59-0.06,0.89l-2.68,37.96c-0.28,3.94-3.7,6.9-7.64,6.63c-3.94-0.28-6.91-3.7-6.63-7.64l2.13-30.21L72.52,67.74 L72.52,67.74L72.52,67.74z M79.5,0c6.68,0,12.1,5.41,12.1,12.1c0,6.68-5.42,12.1-12.1,12.1c-6.68,0-12.1-5.42-12.1-12.1 C67.4,5.41,72.82,0,79.5,0L79.5,0z M59.29,116.56c-6.04,3.99-13.28,6.32-21.06,6.32C17.11,122.88,0,105.77,0,84.65 c0-7.78,2.33-15.02,6.32-21.06l8.86,8.86c-1.93,3.64-3.03,7.79-3.03,12.2c0,14.4,11.67,26.07,26.07,26.07 c4.41,0,8.56-1.1,12.2-3.03L59.29,116.56L59.29,116.56L59.29,116.56z"
                        />
                    </g>
                    </svg>
                </div>
                <span className="mt-2">Disabled Parking</span>
                <input
                    type="radio"
                    value="disabled"
                    checked={placeType === "disabled"}
                    onChange={() => setPlaceType("disabled")}
                    className="form-radio"
                />
                </label>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParkingCard;

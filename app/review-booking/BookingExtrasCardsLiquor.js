import React, { useState } from "react";

const LiquorCard = () => {
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
            {/* Liquor Icon */}
            <div className="bg-gray-300 p-1 rounded-xl h-10 w-10">
  <svg
    height="200px"
    width="200px"
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 512 512"
    xmlSpace="preserve"
    fill="#000000"
    className="h-8 w-8"
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <circle style={{ fill: '#FF314F' }} cx="256" cy="256" r="256"></circle>
      <path
        style={{ fill: '#FF314F' }}
        d="M221.941,402.675l97.39,101.423C430.083,475.912,512,375.525,512,256 c0-11.933-0.836-23.671-2.415-35.169L398.222,109.468l-2.925,4.31h-43.332l-2.586-2.586l-1.586,2.586h-9.188v14.976l-25.715,41.913 l26.081,26.081l-38.572,56.816l-24.631-24.631l-91.226,14.451l68.099,70.166v10.364l-0.805,1.186l0.805,0.805v75.764 L221.941,402.675z"
      ></path>
      <path
        style={{ fill: '#FFFFFF' }}
        d="M361.158,166.264c0,58.077-47.082,105.158-105.158,105.158S150.842,224.34,150.842,166.264H361.158z"
      ></path>
      <path
        style={{ fill: '#D0D1D3' }}
        d="M361.158,166.264H256.576v105.144C314.387,271.096,361.158,224.147,361.158,166.264z"
      ></path>
      <polygon
        style={{ fill: '#FFAD9E' }}
        points="288.299,229.483 280.59,225.628 338.67,109.468 398.222,109.468 398.222,118.088 343.997,118.088 "
      ></polygon>
      <path
        style={{ fill: '#FFC61B' }}
        d="M355.168,201.266H156.832c13.702,38.815,49.53,67.17,92.339,69.918v119.508h-22.761 c-3.772,0-6.828,3.056-6.828,6.828l0,0c0,3.772,3.056,6.828,6.828,6.828h59.18c3.772,0,6.828-3.056,6.828-6.828 s-3.056-6.828-6.828-6.828H262.83V271.184C305.638,268.436,341.466,240.081,355.168,201.266z"
      ></path>
      <path
        style={{ fill: '#EAA22F' }}
        d="M355.168,201.266h-98.594v203.083h29.015c3.772,0,6.828-3.056,6.828-6.828s-3.056-6.828-6.828-6.828 h-22.761V271.184C305.638,268.436,341.466,240.081,355.168,201.266z"
      ></path>
    </g>
  </svg>
            </div>
            <span className="text-lg font-semibold">Drinks</span>

          </div>
        </div>
        <div>
          <span className="text-gray-500">{isExpanded ? "▲" : "▼"}</span>
        </div>
      </div>

      {/* Expandable Section */}
      {isExpanded && (
        <div className="mt-4">
          {/* Drink Type Section */}
          <div className="mb-4">
    <h4 className="font-semibold mb-2">Drinks</h4>
    <div className="flex space-x-16">

        {/* Soft drink Option */}
            <label
            className={`flex flex-col items-center justify-center space-y-2 p-4 border rounded-md cursor-pointer hover:border-blue-300 transition-colors duration-300 ${vehicleType === "motorcycle" ? 'border-blue-600' : ''}`}
            onClick={() => handleVehicleTypeChange("motorcycle")}
            aria-label="Select Motorcycle"
            >
            <div className="bg-blue-100 p-2 rounded-full flex items-center justify-center">
                <svg
                viewBox="0 0 400 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10"
                >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path
                    d="M112 170.553C170.197 172.25 229.086 163.825 287.237 163.825"
                    stroke="#000000"
                    strokeOpacity="0.9"
                    strokeWidth="16"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    ></path>
                    <path
                    d="M150.763 347.627C145.375 319.606 116.381 148.984 137.036 138.69C158.435 128.023 257.744 127.069 265.956 135.252C278.565 147.826 261.956 341.306 254.924 348.313C251.324 351.901 236.608 351.113 232.815 351.113C206.568 351.113 179.483 353.416 153.519 351.064"
                    stroke="#000000"
                    strokeOpacity="0.9"
                    strokeWidth="16"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    ></path>
                    <path
                    d="M238.561 130.446C251.228 103.087 261.324 74.325 273.33 47"
                    stroke="#000000"
                    strokeOpacity="0.9"
                    strokeWidth="16"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    ></path>
                </g>
                </svg>
            </div>
            <span className="mt-2">Soft Drink</span>
            <input
                type="radio"
                value="motorcycle"
                checked={vehicleType === "motorcycle"}
                onChange={() => setVehicleType("motorcycle")}
                className="form-radio"
            />
            </label>

                {/* Coffee Option */}
            <label
                className={`flex flex-col items-center justify-center space-y-2 p-4 border rounded-md cursor-pointer hover:border-blue-300 transition-colors duration-300 ${vehicleType === "car" ? 'border-blue-600' : ''}`}
                onClick={() => handleVehicleTypeChange("car")}
                aria-label="Select car"
            >
                <div className="bg-blue-100 p-2 rounded-full flex items-center justify-center">
                    <svg
                        fill="#000000"
                        viewBox="0 0 48 48"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        className="w-10 h-10"
                    >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path d="M25.478516 1.9277344 A 1.50015 1.50015 0 0 0 24.001953 3.4472656C24.001953 5.4472656 23.314453 5.7773438 22.064453 6.7773438C20.814453 7.7773438 19.001953 9.4472652 19.001953 12.447266 A 1.50015 1.50015 0 1 0 22.001953 12.447266C22.001953 10.447266 22.6875 10.119141 23.9375 9.1191406C25.1875 8.1191406 27.001953 6.4472656 27.001953 3.4472656 A 1.50015 1.50015 0 0 0 25.478516 1.9277344 z M 31.478516 3.9277344 A 1.50015 1.50015 0 0 0 30.001953 5.4472656C30.001953 6.1972656 29.854916 6.5110368 29.650391 6.8007812C29.445865 7.0905258 29.101563 7.3730469 28.601562 7.7480469C28.101562 8.1230469 27.445865 8.5905258 26.900391 9.3632812C26.354916 10.136037 26.001953 11.197266 26.001953 12.447266 A 1.50015 1.50015 0 1 0 29.001953 12.447266C29.001953 11.697266 29.147037 11.383494 29.351562 11.09375C29.556089 10.804006 29.900391 10.523438 30.400391 10.148438C30.900391 9.773437 31.556089 9.3040055 32.101562 8.53125C32.647038 7.7584945 33.001953 6.6972656 33.001953 5.4472656 A 1.50015 1.50015 0 0 0 31.478516 3.9277344 z M 14.615234 15.947266C13.643234 15.947266 12.708828 16.356359 12.048828 17.068359C11.388828 17.781359 11.052953 18.745844 11.126953 19.714844L12.533203 38.021484C12.832203 41.904484 16.117719 44.947266 20.011719 44.947266L27.900391 44.947266C31.795391 44.947266 35.080906 41.904484 35.378906 38.021484L35.384766 37.947266L37.501953 37.947266C41.626454 37.947266 45.001953 34.571767 45.001953 30.447266L45.001953 25.447266C45.001953 23.532311 43.416908 21.947266 41.501953 21.947266L36.613281 21.947266L36.785156 19.716797C36.859156 18.748797 36.524234 17.784313 35.865234 17.070312C35.204234 16.357312 34.268875 15.947266 33.296875 15.947266L14.615234 15.947266 z M 36.382812 24.947266L41.501953 24.947266C41.796998 24.947266 42.001953 25.15222 42.001953 25.447266L42.001953 30.447266C42.001953 32.950765 40.005452 34.947266 37.501953 34.947266L35.615234 34.947266L36.382812 24.947266 z" />
                        </g>
                    </svg>
                </div>
                <span className="mt-2">Coffee</span>
                <input
                    type="radio"
                    value="car"
                    checked={vehicleType === "car"}
                    onChange={() => setVehicleType("car")}
                    className="form-radio"
                />
            </label>


                {/* Tea Option */}
                <label
                className={`flex flex-col items-center justify-center space-y-2 p-4 border rounded-md cursor-pointer hover:border-blue-300 transition-colors duration-300 ${vehicleType === "bus" ? 'border-blue-600' : ''}`}
                onClick={() => handleVehicleTypeChange("bus")}
                aria-label="Select bus"
                >
                <div className="bg-blue-100 p-2 rounded-full flex items-center justify-center">
                    <svg
                    version="1.0"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 64 64"
                    enable-background="new 0 0 64 64"
                    xmlSpace="preserve"
                    fill="#000000"
                    className="w-10 h-10"
                    >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <g>
                        <path fill="#231F20" d="M38,9.498c0,1.887-1.025,2.646-1.055,2.668c-0.46,0.307-0.584,0.927-0.277,1.387 c0.192,0.289,0.51,0.445,0.833,0.445c0.19,0,0.383-0.055,0.554-0.168C38.134,13.777,40,12.5,40,9.498 c0-1.6-0.675-2.439-1.218-3.115C38.328,5.817,38,5.409,38,4.498c0-1.842,1.017-2.638,1.081-2.687 c0.444-0.317,0.553-0.933,0.24-1.384c-0.315-0.454-0.938-0.566-1.392-0.251C37.851,0.231,36,1.551,36,4.498 c0,1.614,0.679,2.459,1.224,3.138C37.691,8.218,38,8.603,38,9.498z"></path>
                        <path fill="#231F20" d="M50,9.498c0,1.887-1.025,2.646-1.055,2.668c-0.46,0.307-0.584,0.927-0.277,1.387 c0.192,0.289,0.51,0.445,0.833,0.445c0.19,0,0.383-0.055,0.554-0.168C50.134,13.777,52,12.5,52,9.498 c0-1.6-0.675-2.439-1.218-3.115C50.328,5.817,50,5.409,50,4.498c0-1.842,1.017-2.638,1.081-2.687 c0.444-0.317,0.553-0.933,0.24-1.384c-0.315-0.454-0.938-0.566-1.392-0.251C49.851,0.231,48,1.551,48,4.498 c0,1.614,0.679,2.459,1.224,3.138C49.691,8.218,50,8.603,50,9.498z"></path>
                        <path fill="#231F20" d="M26,9.498c0,1.887-1.025,2.646-1.055,2.668c-0.46,0.307-0.584,0.927-0.277,1.387 c0.192,0.289,0.51,0.445,0.833,0.445c0.19,0,0.383-0.055,0.554-0.168C26.134,13.777,28,12.5,28,9.498 c0-1.6-0.675-2.439-1.218-3.115C26.328,5.817,26,5.409,26,4.498c0-1.842,1.017-2.638,1.081-2.687 c0.444-0.317,0.553-0.933,0.24-1.384c-0.315-0.454-0.938-0.566-1.392-0.251C25.851,0.231,24,1.551,24,4.498 c0,1.614,0.679,2.459,1.224,3.138C25.691,8.218,26,8.603,26,9.498z"></path>
                        <path fill="#231F20" d="M63,57.998H13c-0.553,0-1,0.447-1,1V60c0,2.208,1.791,4,4,4v-0.002h44V64c2.209,0,4-1.792,4-4v-1.002 C64,58.445,63.553,57.998,63,57.998z"></path>
                        <path fill="#231F20" d="M62,17.998H52v10.586l3.707,3.707C55.895,32.479,56,32.732,56,32.998v8c0,0.553-0.447,1-1,1h-8 c-0.553,0-1-0.447-1-1v-8c0-0.266,0.105-0.52,0.293-0.707L50,28.584V17.998H13h-1H4c-2.209,0-4,1.791-4,4v8L0.009,30H0 c0.001,6.625,5.373,11.998,12,11.998h2.938c4.336,8.316,13.033,14,23.062,14c14.359,0,26-11.642,26-26v-10 C64,18.894,63.104,17.998,62,17.998z M12,35.998c-3.313,0-5.999-2.686-6-5.998v-6.002h6v6c0,2.066,0.248,4.073,0.704,6H12z"></path>
                        <polygon fill="#231F20" points="48,39.998 54,39.998 54,33.412 51,30.412 48,33.412 "></polygon>
                        </g>
                    </g>
                    </svg>
                </div>
                <span className="mt-2">Tea</span>
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
            <div>
            <h4 className="font-semibold mb-2">Liquor</h4>
            <div className="flex space-x-16">
                 {/* Wine  */}
            <label
            className={`flex flex-col items-center justify-center space-y-2 p-4 border rounded-md cursor-pointer hover:border-blue-300 transition-colors duration-300 ${placeType === "wine" ? 'border-blue-600' : ''}`}
            onClick={() => handlePlaceTypeChange("wine")}
            aria-label="Select wine"
            >
            <div className="bg-blue-100 p-2 rounded-full flex items-center justify-center">
                <svg
                viewBox="0 0 960 960"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10"
                >
                <path
                    d="M286.641 116.739C277.243 113.365 267.776 108.269 269.589 97.0338C270.468 90.4908 274.299 85.3458 280.483 84.0638C295.009 81.5158 281.583 61.6968 297.067 49.5238C303.453 43.5418 310.253 40.1558 318.955 40.7858C338.764 42.2188 358.619 43.2218 378.362 45.2958C392.724 47.0638 397.409 61.1798 401.02 72.6708C426.411 79.1748 425.915 104.294 400.891 110.407C400.579 168.257 388.319 263.687 427.445 309.735C456.74 339.972 486.558 372.555 486.537 417.003C489.511 518.04 491.516 619.168 493.85 720.236C489 785.001 508.863 902.095 420.862 913.191C343.954 922.841 201.487 937.115 196.126 828.786C194.715 789.041 192.618 749.315 191.784 709.561C192.715 593.967 177.923 475.043 205.142 361.665C210.108 342.575 222.593 328.389 237.156 315.826C254.726 298.677 281.577 286.246 280.868 258.178C282.437 211.017 285.21 163.897 286.641 116.739ZM387.018 445.001C387.018 445.038 387.018 445.075 387.018 445.112C315.157 444.664 281.998 435.75 281.112 522.736C281.568 583.837 282.841 644.935 283.885 706.034C284.363 734.014 297.522 752.193 324.502 760.102C363.839 771.407 405.473 765.038 445.821 765.154C500.439 764.16 474.098 647.752 475.526 611.754C473.987 570.822 473.329 529.858 472.401 488.905C473.533 469.278 477.357 447.014 451.229 445.175C429.847 444.478 408.424 445.001 387.018 445.001ZM218.842 516.267C225.106 618.743 224.809 728.784 232.248 832.278C234.324 849.643 260.069 847.044 259.575 829.802C259.786 823.345 259.541 816.858 259.218 810.398C255.936 679.363 236.79 547.766 252.264 417.017C256.914 333.886 328.544 335.324 328.801 261.453C329.197 212.81 330.027 164.172 330.492 115.53C330.51 113.646 329.081 111.13 327.533 109.95C317.211 102.088 317.405 92.7168 328.2 85.0078C335.278 79.9948 328.333 67.6778 321.951 66.8568C306.336 65.1508 314.225 81.8488 303.668 86.2438C293.21 91.5008 292.982 104.785 303.32 110.328C307.313 112.469 308.122 114.872 307.939 118.765C305.938 167.607 304.699 216.488 303.707 265.358C303.45 281.242 297.871 294.151 286.313 304.801C279.087 311.46 272.128 318.406 264.938 325.105C214.821 375.126 224.828 448.179 218.842 516.267Z"
                    fill="#000000"
                />
                <path
                    d="M654.575 857.157C671.573 860.53 688.355 862.607 704.894 866.712C722.099 871.624 721.527 895.96 703.719 899.296C662.155 908.184 618.142 912.853 576.27 903.595C558.228 897.139 560.191 871.313 579.649 868.51C590.448 866.418 601.22 864.155 612.068 862.352C616.554 861.606 618.78 859.86 619.101 855.095C624.916 801.739 623.11 747.908 628.652 694.593C629.125 690.825 628.329 688.86 624.182 688.189C522.677 673.759 519.692 548.752 542.066 470.338C546.875 452.166 550.684 449.019 569.112 448.096C624.381 445.683 679.579 441.097 734.913 440.555C764.874 441.081 763.897 503.833 768.522 525.501C782.146 596.028 748.569 671.318 674.182 686.572C661.05 690.103 661.22 690.014 660.907 703.414C658.957 754.731 660.465 806.062 654.575 857.157ZM593.471 490.646C592.156 466.237 565.881 473.028 564.412 494.547C554.795 536.878 558.376 583.141 580.348 621.151C589.384 637.479 612.033 624.628 602.783 608.847C581.799 571.848 586.538 530.755 593.471 490.646Z"
                    fill="#000000"
                />
                <path
                    d="M387.019 445.001C408.425 445.001 429.848 444.478 451.232 445.173C477.35 447.113 473.551 469.129 472.401 488.904C473.331 529.856 473.988 570.821 475.525 611.752C474.089 647.987 500.485 763.955 445.825 765.152C405.476 765.045 363.84 771.401 324.504 760.103C297.524 752.193 284.365 734.013 283.887 706.033C282.843 644.934 281.57 583.837 281.113 522.734C282.336 435.409 314.618 444.84 387.02 445.112C387.019 445.075 387.019 445.038 387.019 445.001Z"
                    fill="white"
                />
                <path
                    d="M218.844 516.265C224.817 448.207 214.832 375.1 264.935 325.101C272.129 318.404 279.089 311.457 286.314 304.798C297.871 294.149 303.45 281.241 303.707 265.357C304.699 216.487 305.938 167.605 307.939 118.763C308.122 114.87 307.313 112.465 303.32 110.328C292.982 104.782 293.21 91.4978 303.668 86.2398C314.225 81.8438 306.336 65.1458 321.951 66.8578C328.333 67.6788 335.278 79.9928 328.2 85.0058C317.405 92.7208 317.211 102.088 327.533 109.95C329.081 111.13 330.51 113.644 330.492 115.528C330.027 164.162 329.197 212.81 328.801 261.453C328.544 335.324 256.914 333.886 252.264 417.017C236.79 547.766 255.936 679.363 259.218 810.398C259.541 816.858 259.786 823.345 259.575 829.802C260.069 847.044 234.324 849.643 232.248 832.278C224.809 728.784 225.106 618.743 218.842 516.267Z"
                    fill="white"
                />
                </svg>
            </div>
            <p className="text-sm text-center">Wine</p>
            <input
                    type="radio"
                    value="wine"
                    checked={placeType === "wine"}
                    onChange={() => setPlaceType("wine")}
                    className="form-radio"
                />
            </label>


             {/* Beer  */}
              
              
            <label
            className={`flex flex-col items-center justify-center space-y-2 p-4 border rounded-md cursor-pointer hover:border-blue-300 transition-colors duration-300 ${placeType === "beer" ? 'border-blue-600' : ''}`}
            onClick={() => handlePlaceTypeChange("beer")}
            aria-label="Select beer"
            >
            <div className="bg-blue-100 p-2 rounded-full flex items-center justify-center">
                <svg
                fill="#000000"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 512 512"
                xmlSpace="preserve"
                stroke="#000000"
                strokeWidth="5.12"
                className="w-10 h-10"
                >
                <g>
                    <path d="M379.734,127.927h-31.787v319.819H68.106V127.929H52.115v335.81h311.824v-39.978h23.987v-72.376 c40.347-4.124,71.959-38.349,71.959-79.734v-63.571C459.885,163.884,423.93,127.927,379.734,127.927z M371.934,407.77h-7.996 v-55.968h7.996V407.77z M443.894,271.651c0,35.281-28.703,64.063-63.985,64.159h-15.97V143.919h15.795 c35.377,0,64.16,28.782,64.16,64.16V271.651z"></path>
                    <rect x="88.108" y="416.68" width="151.874" height="15.711"></rect>
                    <rect x="256.741" y="416.68" width="63.892" height="15.711"></rect>
                    <rect x="80.776" y="199.867" width="15.711" height="32.47"></rect>
                    <rect x="103.819" y="232.336" width="15.711" height="15.711"></rect>
                    <rect x="144.668" y="279.47" width="15.711" height="56.56"></rect>
                    <rect x="160.379" y="336.03" width="15.711" height="15.711"></rect>
                    <rect x="192.849" y="295.181" width="15.711" height="15.711"></rect>
                    <rect x="279.784" y="135.975" width="15.711" height="48.181"></rect>
                    <rect x="296.543" y="184.156" width="15.711" height="63.892"></rect>
                    <rect x="312.254" y="160.065" width="15.711" height="15.711"></rect>
                    <rect x="80.776" y="310.892" width="15.711" height="48.181"></rect>
                    <rect x="112.199" y="375.831" width="15.711" height="15.711"></rect>
                    <rect x="264.073" y="295.181" width="15.711" height="32.47"></rect>
                    <rect x="279.784" y="327.651" width="15.711" height="48.181"></rect>
                    <rect x="224.271" y="375.831" width="15.711" height="15.711"></rect>
                    <path d="M116.079,87.799h15.992c-0.001-4.19,3.169-7.844,8.406-7.844V63.964C126.861,63.964,116.079,75.23,116.079,87.799z"></path>
                </g>
                </svg>
            </div>
            <span className="mt-2">Beer</span>
            <input
                type="radio"
                value="beer"
                checked={placeType === "beer"}
                onChange={() => setPlaceType("beer")}
                className="form-radio"
            />
            </label>

                 {/* Whisky  */}
              
              
            <label
            className={`flex flex-col items-center justify-center space-y-2 p-4 border rounded-md cursor-pointer hover:border-blue-300 transition-colors duration-300 ${placeType === "whisky" ? 'border-blue-600' : ''}`}
            onClick={() => handlePlaceTypeChange("whisky")}
            aria-label="Select whisky"
            >
            <div className="bg-blue-100 p-2 rounded-full flex items-center justify-center">
                <svg
                fill="#000000"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 260 244"
                enableBackground="new 0 0 260 244"
                xmlSpace="preserve"
                className="w-10 h-10"
                >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path d="M2,2l30.42,219.36C34.06,233.16,44.53,242,56.48,242h146c11.89,0,22.42-8.79,24.11-20.53L258,2H2z M130,196 c0,3.31-2.69,6-6,6H72c-3.31,0-6-2.69-6-6v-44c0-3.31,2.69-6,6-6h52c3.31,0,6,2.69,6,6V196z M225.68,114H203l4.7,10.51 c1.27,3.06-0.19,6.57-3.26,7.83c0,0-48.07,19.81-48.07,19.81c-2.516,1.017-6.349,0.225-7.84-3.26L134,114h-27l-20.43,19.93 c-2.34,2.35-6.14,2.35-8.48,0L58,114H33.67L20.31,18h219.03L225.68,114z M117.684,102.821c2.343-2.343,2.343-6.142,0-8.485 l-36.77-36.77c-2.343-2.343-6.142-2.343-8.485,0L41.316,88.679c-2.343,2.343-2.343,6.142,0,8.485L58,114h49L117.684,102.821z M190.939,83.824c-1.263-3.064-4.77-4.524-7.834-3.261l-48.077,19.813c-3.064,1.263-4.524,4.77-3.261,7.834L134,114l69,0 L190.939,83.824z"></path>
                </g>
                </svg>
            </div>
            <span className="mt-2">Whisky</span>
            <input
                type="radio"
                value="whisky"
                checked={placeType === "whisky"}
                onChange={() => setPlaceType("whisky")}
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

export default LiquorCard;

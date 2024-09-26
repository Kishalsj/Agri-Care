import { useRef, useState, useEffect, useCallback } from "react";
import debounce from "@/utils/debounce";

const SearchedHotel = ({ hotel, handleEdit, handleDelete, handleTagClick }) => {
  hotel.fullName.replace(hotel?.name, `<b>${hotel?.name}</b>`);
  return (
    <li
      className="default-search-item relative cursor-pointer select-none pl-4 py-2 pr-4 hover:bg-[#1893F8] hover:text-white dark:hover:bg-gray-500 text-gray-700 dark:hover:text-white"
      onClick={() => handleTagClick(hotel)}
    >
      <div className="flex flex-row justify-between items-center">
        <div className="flex  flex-row gap-2 items-center justify-between flex-1">
          <span className="flex items-center">
            {(hotel.type === "Region" || hotel.type === "State") && (
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M256 32C167.67 32 96 96.51 96 176c0 128 160 304 160 304s160-176 160-304c0-79.49-71.67-144-160-144zm0 224a64 64 0 1164-64 64.07 64.07 0 01-64 64z"></path>
              </svg>
            )}

            {hotel.type === "MultiCity" && (
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M217 25v30h30V25h-30zm48 0v30h30V25h-30zm48 0v30h30V25h-30zm-96 48v46h30V73h-30zm48 0v46h30V73h-30zm48 0v46h30V73h-30zm-96 64v46h30v-46h-30zm48 0v46h30v-46h-30zm48 0v46h30v-46h-30zm174 6.508l-94 53.715V215h94v-71.492zM217 201v46h30v-46h-30zm48 0v46h30v-46h-30zm48 0v46h30v-46h-30zm80 32v110h94V233h-94zM39 256v23h18v-23H39zm178 9v46h30v-46h-30zm48 0v46h30v-46h-30zm48 0v46h30v-46h-30zM37.562 297l-7 14h146.875l-7-14H37.563zM25 329v158h23v-23h32v23h48v-23h32v23h23V329H25zm192 0v46h30v-46h-30zm48 0v46h30v-46h-30zm48 0v46h30v-46h-30zM48 352h32v16H48v-16zm80 0h32v16h-32v-16zm265 9v126h31v-23h32v23h31V361h-94zM48 384h32v16H48v-16zm80 0h32v16h-32v-16zm89 9v46h30v-46h-30zm48 0v46h30v-46h-30zm48 0v46h30v-46h-30zM48 416h32v16H48v-16zm80 0h32v16h-32v-16zm89 41v30h30v-30h-30zm48 0v30h30v-30h-30zm48 0v30h30v-30h-30z"></path>
              </svg>
            )}

            {hotel.type === "City" && (
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 640 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M616 192H480V24c0-13.26-10.74-24-24-24H312c-13.26 0-24 10.74-24 24v72h-64V16c0-8.84-7.16-16-16-16h-16c-8.84 0-16 7.16-16 16v80h-64V16c0-8.84-7.16-16-16-16H80c-8.84 0-16 7.16-16 16v80H24c-13.26 0-24 10.74-24 24v360c0 17.67 14.33 32 32 32h576c17.67 0 32-14.33 32-32V216c0-13.26-10.75-24-24-24zM128 404c0 6.63-5.37 12-12 12H76c-6.63 0-12-5.37-12-12v-40c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40zm0-96c0 6.63-5.37 12-12 12H76c-6.63 0-12-5.37-12-12v-40c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40zm0-96c0 6.63-5.37 12-12 12H76c-6.63 0-12-5.37-12-12v-40c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40zm128 192c0 6.63-5.37 12-12 12h-40c-6.63 0-12-5.37-12-12v-40c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40zm0-96c0 6.63-5.37 12-12 12h-40c-6.63 0-12-5.37-12-12v-40c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40zm0-96c0 6.63-5.37 12-12 12h-40c-6.63 0-12-5.37-12-12v-40c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40zm160 96c0 6.63-5.37 12-12 12h-40c-6.63 0-12-5.37-12-12v-40c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40zm0-96c0 6.63-5.37 12-12 12h-40c-6.63 0-12-5.37-12-12v-40c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40zm0-96c0 6.63-5.37 12-12 12h-40c-6.63 0-12-5.37-12-12V76c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40zm160 288c0 6.63-5.37 12-12 12h-40c-6.63 0-12-5.37-12-12v-40c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40zm0-96c0 6.63-5.37 12-12 12h-40c-6.63 0-12-5.37-12-12v-40c0-6.63 5.37-12 12-12h40c6.63 0 12 5.37 12 12v40z"></path>
              </svg>
            )}

            {hotel.type === "Hotel" && (
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 576 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M560 64c8.84 0 16-7.16 16-16V16c0-8.84-7.16-16-16-16H16C7.16 0 0 7.16 0 16v32c0 8.84 7.16 16 16 16h15.98v384H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h240v-80c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v80h240c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16h-16V64h16zm-304 44.8c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4zm0 96c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4zm-128-96c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4zM179.2 256h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4c0 6.4-6.4 12.8-12.8 12.8zM192 384c0-53.02 42.98-96 96-96s96 42.98 96 96H192zm256-140.8c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4zm0-96c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4z"></path>
              </svg>
            )}

            {hotel.type === "Airport" && (
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M22 16v-2l-8.5-5V3.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5V9L2 14v2l8.5-2.5V19L8 20.5V22l4-1 4 1v-1.5L13.5 19v-5.5L22 16z"></path>
                <path fill="none" d="M0 0h24v24H0V0z"></path>
              </svg>
            )}

            {hotel.type === "PointOfInterest" && (
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                version="1.2"
                baseProfile="tiny"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M16.5 11c1.93 0 3.5-1.57 3.5-3.5s-1.57-3.5-3.5-3.5-3.5 1.57-3.5 3.5v1.5h-2v-1.5c0-1.93-1.57-3.5-3.5-3.5s-3.5 1.57-3.5 3.5 1.57 3.5 3.5 3.5h1.5v2h-1.5c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5v-1.5h2v1.5c0 1.93 1.57 3.5 3.5 3.5s3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5h-1.5v-2h1.5zm-1.5-3.5c0-.828.673-1.5 1.5-1.5s1.5.672 1.5 1.5c0 .826-.673 1.5-1.5 1.5h-1.5v-1.5zm-6 9c0 .826-.673 1.5-1.5 1.5s-1.5-.674-1.5-1.5c0-.828.673-1.5 1.5-1.5h1.5v1.5zm0-7.5h-1.5c-.827 0-1.5-.674-1.5-1.5 0-.828.673-1.5 1.5-1.5s1.5.672 1.5 1.5v1.5zm4 4h-2v-2h2v2zm3.5 2c.827 0 1.5.672 1.5 1.5 0 .826-.673 1.5-1.5 1.5s-1.5-.674-1.5-1.5v-1.5h1.5z"></path>
              </svg>
            )}

            {hotel.type === "Neighborhood" && (
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 16 16"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7.207 1a1 1 0 0 0-1.414 0L.146 6.646a.5.5 0 0 0 .708.708L1 7.207V12.5A1.5 1.5 0 0 0 2.5 14h.55a2.51 2.51 0 0 1-.05-.5V9.415a1.5 1.5 0 0 1-.56-2.475l5.353-5.354L7.207 1Z"></path>
                <path d="M8.793 2a1 1 0 0 1 1.414 0L12 3.793V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.293l1.854 1.853a.5.5 0 0 1-.708.708L15 8.207V13.5a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 4 13.5V8.207l-.146.147a.5.5 0 1 1-.708-.708L8.793 2Z"></path>
              </svg>
            )}

            {hotel.type === "TrainStation" && (
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                version="1.1"
                id="Layer_1"
                x="0px"
                y="0px"
                viewBox="0 0 30 30"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.25,12.68v-0.32c0-0.1,0.03-0.18,0.1-0.25c0.07-0.07,0.15-0.1,0.25-0.1h7.58c0.1,0,0.18,0.03,0.25,0.1
            c0.07,0.07,0.1,0.15,0.1,0.25v0.32c0,0.1-0.03,0.18-0.1,0.25c-0.07,0.07-0.15,0.1-0.25,0.1h-0.44v1.65h2.12
            c0.02-0.28,0.14-0.52,0.35-0.71c0.21-0.19,0.46-0.29,0.75-0.29c0.29,0,0.53,0.1,0.74,0.29c0.21,0.19,0.32,0.43,0.35,0.71h1.32v-3.39
            c-0.14-0.01-0.25-0.06-0.35-0.16c-0.1-0.1-0.15-0.23-0.15-0.37v-0.31c0-0.14,0.05-0.27,0.16-0.38s0.24-0.16,0.39-0.16h1.99
            c0.15,0,0.28,0.05,0.38,0.16s0.15,0.23,0.15,0.38v0.31c0,0.14-0.05,0.27-0.14,0.37c-0.09,0.1-0.2,0.16-0.34,0.16v3.39h1.56
            c0.27,0,0.51,0.1,0.71,0.3s0.3,0.44,0.3,0.71v2.93l3.73,4.87h-4.74v-3.04h-0.71c0.11,0.26,0.16,0.54,0.16,0.83
            c0,0.61-0.21,1.12-0.64,1.56c-0.43,0.43-0.95,0.65-1.55,0.65c-0.61,0-1.12-0.22-1.56-0.65c-0.43-0.43-0.65-0.95-0.65-1.56
            c0-0.29,0.05-0.57,0.16-0.83h-1c0.11,0.27,0.17,0.55,0.17,0.83c0,0.61-0.22,1.12-0.65,1.56s-0.95,0.65-1.56,0.65
            c-0.61,0-1.12-0.22-1.55-0.65s-0.64-0.95-0.64-1.56c0-0.29,0.05-0.57,0.16-0.83H9.97c0.12,0.29,0.18,0.57,0.18,0.83
            c0,0.61-0.22,1.12-0.65,1.56s-0.95,0.65-1.56,0.65s-1.12-0.22-1.56-0.65s-0.65-0.95-0.65-1.56c0-0.29,0.06-0.57,0.17-0.84
            c-0.24-0.04-0.45-0.15-0.61-0.34s-0.24-0.41-0.24-0.66v-0.86H5.03v-5.55H4.6c-0.1,0-0.18-0.03-0.25-0.1
            C4.28,12.86,4.25,12.78,4.25,12.68z M6.3,16.62c0,0.21,0.07,0.39,0.22,0.54c0.15,0.15,0.33,0.22,0.54,0.22h1.44
            c0.21,0,0.39-0.07,0.53-0.22c0.14-0.15,0.22-0.33,0.22-0.54v-2.3c0-0.21-0.07-0.38-0.22-0.53c-0.15-0.15-0.32-0.22-0.53-0.22H7.07
            c-0.21,0-0.39,0.07-0.54,0.23c-0.15,0.15-0.22,0.32-0.22,0.52V16.62z M15.78,5.43c0,0.41,0.16,0.76,0.47,1.04
            c0,0.2,0.09,0.43,0.26,0.68s0.36,0.4,0.56,0.44c0.04,0.22,0.15,0.41,0.31,0.57c0.16,0.15,0.36,0.25,0.59,0.3
            c-0.11,0.11-0.16,0.24-0.16,0.39c0,0.18,0.06,0.33,0.18,0.45c0.12,0.12,0.27,0.18,0.45,0.18c0.18,0,0.33-0.06,0.46-0.19
            c0.13-0.12,0.19-0.28,0.19-0.45c0-0.02,0-0.05-0.01-0.09c-0.01-0.04-0.01-0.08-0.01-0.1h0.03c0.21,0,0.39-0.08,0.54-0.23
            c0.15-0.15,0.23-0.34,0.23-0.55c0-0.1-0.04-0.22-0.12-0.38c0.17-0.09,0.31-0.25,0.41-0.47h0.45C21,7,21.34,6.85,21.61,6.57
            c0.28-0.28,0.42-0.61,0.42-1.01c0-0.34-0.11-0.64-0.33-0.9c-0.22-0.26-0.5-0.43-0.83-0.52c-0.08-0.4-0.29-0.73-0.62-0.99
            s-0.71-0.39-1.12-0.39c-0.41,0-0.77,0.13-1.08,0.38c-0.31,0.25-0.52,0.58-0.62,0.97h-0.11c-0.41,0-0.77,0.13-1.08,0.39
            C15.93,4.75,15.78,5.07,15.78,5.43z"
                ></path>
              </svg>
            )}

            <span className="flex flex-col ml-4">
              <b>{hotel?.name}</b>
              <span>{hotel.fullName.slice(hotel?.name.length + 1)}</span>
            </span>
          </span>
          <span className="text-xs px-2 py-1 border-inherit border-[1px] rounded-md">
            {(hotel.type === "Region" || hotel.type === "State") && "Region"}
            {hotel.type === "City" && "City"}
            {hotel.type === "MultiCity" && "Multi City"}
            {hotel.type === "Hotel" && "Hotel"}
            {hotel.type === "Airport" && "Airport"}
            {hotel.type === "PointOfInterest" && "POI"}
            {hotel.type === "Neighborhood" && "Neighborhood"}
            {hotel.type === "TrainStation" && "Train Station"}
          </span>
        </div>
      </div>
    </li>
  );
};

const SearchList = ({
  data,
  handleTagClick,
  inputRef,
  searchText,
  handleonChange,
  handleClose,
}) => {
  if (typeof data != "undefined" && data.length > 0) {
    return (
      <div className="search-location-input -top-1 bg-white shadowbox absolute rounded-2xl  overflow-hidden w-[262px] md:w-[500px] xl:w-[600px] max-w-[600px] md:max-w-none popup-zoom shadow-xl z-10 border-[1px] ">
        <div className="input-container">
          <input
            className="bg-[#fff] px-4 w-full shadowbox rounded-tl-[15px] rounded-tr-[15px] relative z-50 file:relative focus:outline-none focus:border-none md:flex-initial h-[95px] font-base "
            placeholder="Where are you going?"
            type="text"
            ref={inputRef}
            value={searchText}
            onChange={handleonChange}
          />

          {searchText && (
            <span onClick={handleClose} className="cross-icon">
              ×
            </span>
          )}
          <ul className="overflow-y-auto h-[390px] w-full overflow-x-auto relative z-50    bg-white  flex flex-col gap-2">
            {data.map((hotel) => (
              <SearchedHotel
                key={hotel.id}
                hotel={hotel}
                handleTagClick={handleTagClick}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
};

export default function SearchBar({
  location,
  setLocation,
  isHomePage = false,
}) {
  const [searchedResults, setSearchedResults] = useState([]);
  const inputRef = useRef("");
  const searchListContainerRef = useRef("");
  const [searchText, setSearchText] = useState(location?.fullName || "");
  const [showModal, setShowModal] = useState(true);

  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      /**
       * Close if clicked outside of dropdown
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowModal(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  };

  const fetchDestinationList = (value) => {
    fetch(
      `https://autosuggest-v2.us.prod.zentrumhub.com/api/locations/locationcontent/autosuggest?term=${value}&countries=FR,ES,US,CN,IT,TR,MX,DE,TH,GB,JP,AT,GR,HK,MY,RU,PT,CA,NL,AR,KR,HR,CZ,MA,EG,ID,AE,PL,PH,AU,BE,SA,SE,CH,HU,IL,PT,SG,RO,ZA,FI,CL,IE,OM,BR,DK,NO,VN&strictFilterForCountries=false`
    )
      .then((result) => result.json())
      .then((data) => {
        setSearchedResults(data.locationSuggestions);
      })
      .catch((err) => console.error(err));
  };

  const handleInputClick = (e) => {
    let val = "";
    if (e.target.value) val = e.target.value; //if the input field is NOT empty, the same dropdown search list will be displayed, else default list will be shown
    fetchDestinationList(val);
    setShowModal(true); //dropdown list opens
  };

  const handleTagClick = (hotel) => {
    setSearchText(hotel.fullName); // changes the value of input search field to the name of selected hotel
    setShowModal(false); // closes the dropdown list
    setLocation(hotel);
  };

  const handleClose = () => {
    setSearchText("");
    fetchDestinationList("");
  };

  const callDebounce = useCallback(debounce(fetchDestinationList), []); //makes sure to return the same  memoized debounced function instance in between rerenders

  const handleonChange = (e) => {
    setShowModal(true); //dropdown list re-opens for any changes in text input that satisifes debounce timeout
    setSearchText(e.target.value); //value of search input field
    callDebounce(e.target.value);
  };

  useOutsideAlerter(searchListContainerRef);

  return (
    <div
      id="hotel-search-input"
      className={`${
        isHomePage ? "h-[52px]" : "h-9"
      } search-location-input flex flex-col w-full`}
    >
      {isHomePage && (
        <label className="-mb-[4px] sticky text-[13px] font-semibold">
          Going to
        </label>
      )}
      <div className="flex flex-1" onClick={handleInputClick}>
        <input
          className={`${
            isHomePage ? "" : "rounded-full h-9 px-4"
          } bg-[fff] text-[14px] lg:text-[12px] xl:text-[14px]  w-[99%] file:relative focus:outline-none focus:border-none flex-initial  font-base `}
          placeholder="Enter a destination"
          type="text"
          id="default-search"
          ref={inputRef}
          value={searchText}
          onChange={handleonChange}
        />
      </div>
      {showModal && (
        <div ref={searchListContainerRef}>
          <SearchList
            data={searchedResults}
            handleTagClick={handleTagClick}
            inputRef={inputRef}
            searchText={searchText}
            handleonChange={handleonChange}
            handleClose={handleClose}
          />
        </div>
      )}
    </div>
  );
}

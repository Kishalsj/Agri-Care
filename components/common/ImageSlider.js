import { useState, useEffect } from "react";
import Image from "next/image";

import CloseIcon from "../icons/CloseIcon";

export default function ImageSlider({ images, close }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageUrls, setImageUrls] = useState([]);
  const [offset, setOffset] = useState(0); // Keeps track of the offset of the first image being displayed
  const imagesPerPage = 10; // Number of images to display per page

  // Update imageUrls whenever images prop changes
  useEffect(() => {
    setImageUrls(images.map((image) => image.links[0].url));
  }, [images]);

  // Handle click on an image in the images map
  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handlePreviousClick = () => {
    setCurrentImageIndex((prevIndex) => {
      const newIndex = prevIndex - 1;

      return imageUrls[newIndex] ? newIndex : prevIndex;
    });
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) => {
      const newIndex = prevIndex + 1;

      return imageUrls[newIndex] ? newIndex : prevIndex;
    });
  };

  // Handle arrow key press
  const handleKeyPress = (event) => {
    if (event.keyCode === 37) {
      // Left arrow key
      handlePreviousClick();
    } else if (event.keyCode === 39) {
      // Right arrow key
      handleNextClick();
    }
  };

  // Update the offset of the first image being displayed whenever currentImageIndex changes
  useEffect(() => {
    if (currentImageIndex < offset) {
      setOffset(currentImageIndex);
    } else if (currentImageIndex >= offset + imagesPerPage) {
      setOffset(currentImageIndex - imagesPerPage + 1);
    }
  }, [currentImageIndex, offset]);

  // Create a subarray of imageUrls with the images to be displayed in the current page
  const displayedImages = imageUrls.slice(offset, 10000);

  return (
    <div
      className="bg-white flex flex-col shadow-lg rounded-md px-2.5 py-2.5 outline-none space-y-1 max-w-[400px] lg:max-w-[800px]"
      onKeyDown={handleKeyPress}
      tabIndex="0"
    >
      <div className="relative">
        <div
          className="rounded-full bg-[#002248] absolute left-2 h-10 w-10 flex items-center justify-center opacity-50 cursor-pointer top-1/2 hover:bg-white text-white hover:text-[#002248]"
          onClick={handlePreviousClick}
        >
          <span className="opacity-100 select-none">&larr;</span>
        </div>
        <div
          className="rounded-full bg-[#002248] absolute right-2 h-10 w-10 flex items-center justify-center opacity-50 cursor-pointer top-1/2 hover:bg-white text-white hover:text-[#002248]"
          onClick={handleNextClick}
        >
          <span className="opacity-100 select-none">&rarr;</span>
        </div>
        <Image
          src={
            imageUrls[currentImageIndex]
              ? imageUrls[currentImageIndex]
              : "/img/image-default.jpeg"
          }
          className="w-full object-cover rounded-md h-[500px] border-x-2 border-x-transparent border-t-2 border-t-transparent"
          alt="Big"
          height={500}
          width={800}
          loading="eager"
        />
      </div>

      <div className="flex overflow-x-scroll flex-row w-full">
        {displayedImages.map((imageUrl, index) => (
          <Image
            key={offset + index}
            src={imageUrl}
            alt={`Im ${offset + index}`}
            height={80}
            width={80}
            className={`${
              offset + index === currentImageIndex
                ? "border-[#1893F8]"
                : "border-transparent"
            } image-slider-item border-4 rounded-lg object-cover cursor-pointer min-w-[80px] w-[80px] h-[80px]`}
            onClick={() => handleImageClick(offset + index)}
            loading="eager"
            data-index={currentImageIndex}
          />
        ))}
      </div>
      <div className="arrows absolute right-5 flex w-[97%] items-end justify-end">
        <div
          className="bg-[#F5F5F6] cursor-pointer border-none rounded-full px-2 py-2 mt-1 items-center justify-center "
          onClick={() => {
            close();
          }}
        >
          <CloseIcon />
        </div>
      </div>
    </div>
  );
}

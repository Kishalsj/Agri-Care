// "use client";

// import Image from "next/image";
// import Popup from "reactjs-popup";

// import ImageSlider from "@/components/common/ImageSlider";
// import ImageIcon from "@/components/icons/ImageIcon";

// export default function HotelListingImageGallery({ hotel, heroImage, images }) {
 

// return (
//     <div
//       id="hotel-details-image-gallery"
//       className="flex gap-3 relative bg-gray-100 rounded-2xl p-4"
//     >
//       <Popup
//         trigger={
//           <button
//             id="hotel-details-image-gallery-more-button"
//             className="absolute bottom-4 flex flex-row items-center justify-center gap-1.5 right-4 bg-[#1893F8] text-white rounded-md p-2"
//             aria-describedby="Image Gallery"
//             suppressHydrationWarning={true}
//           >
//             <ImageIcon />+ {images.length}
//           </button>
//         }
//         overlayStyle={{ background: "rgba(0,0,0,0.5)" }}
//         contentStyle={{ height: "80%" }}
//         modal
//       >
//         {(close) => <ImageSlider close={close} images={images} />}
//       </Popup>
//       <div className="h-[300px] md:h-[460px]">
//         <Image
//           src={heroImage}
//           alt="Friends"
//           width={688}
//           height={409}
//           className="w-full rounded-xl object-cover h-full md:h-[462px] shadow-lg"
//           suppressHydrationWarning={true}
//           loading="eager"
//         />
//       </div>
//       <div className="hidden gap-3 lg:grid grid-cols-2 h-[460px]">
//         {images.slice(1, 5).map((photo, index) => (
//           <Image
//             key={index}
//             src={photo.links[0].url}
//             alt="img"
//             width={340}
//             height={200}
//             className="w-full h-[225px] object-cover shadow-lg rounded-xl"
//             loading="eager"
//           />
//         ))}
//       </div>
//     </div>
//   );
// }
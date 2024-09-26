import {
	FaWifi,
	FaParking,
	FaSwimmingPool,
	FaConciergeBell,
	FaLanguage,
	FaHotTub,
} from "react-icons/fa";
import { GiMeal } from "react-icons/gi";
import { IoLogoNoSmoking, IoIosFitness } from "react-icons/io";
import {
	MdOutlineLocalBar,
	MdMonitor,
	MdRestaurant,
	MdAtm,
	MdAirportShuttle,
	MdPets,
	MdCasino,
	MdAirlineSeatIndividualSuite,
	MdChildCare,
	MdMedicalServices,
	MdSportsTennis,
} from "react-icons/md";
import { GiBarbecue, GiGolfFlag, GiMicrophone } from "react-icons/gi";
import { TbDisabled, TbMassage } from "react-icons/tb";
import { IoLibrary } from "react-icons/io5";
import { GrLounge } from "react-icons/gr";
import { BsCurrencyExchange, BsSafeFill } from "react-icons/bs";
import { RiBilliardsFill } from "react-icons/ri";
import React, { useState } from "react";
import { SiDiscogs } from "react-icons/si";
import Popup from "reactjs-popup";

function getAmenityIcon(name) {
	switch (name) {
		case "Wifi":
			return (
				<div className="flex flex-row gap-1 text-[12px] 2xl:text-[16px] items-center">
					<FaWifi /> <span> {name}</span>{" "}
				</div>
			);
		case "Parking":
			return (
				<div className="flex flex-row gap-1 text-[12px] 2xl:text-[16px] items-center">
					{" "}
					<FaParking />
					{name}
				</div>
			);
		case "Swimming Pool":
			return (
				<div className="flex flex-row gap-1 text-[12px] 2xl:text-[16px] items-center">
					{" "}
					<FaSwimmingPool /> {name}{" "}
				</div>
			);
		case "Breakfast":
			return (
				<div className="flex flex-row gap-1 text-[12px] 2xl:text-[16px] items-center">
					{" "}
					<GiMeal />
					{name}
				</div>
			);
		case "Business Center":
			return (
				<div className="flex flex-row gap-1 text-[12px] 2xl:text-[16px] items-center">
					{" "}
					<FaSwimmingPool />
					<span> {name}</span>
				</div>
			);
		case "Bar":
			return (
				<div className="flex flex-row gap-1 text-[12px] 2xl:text-[16px] items-center">
					{" "}
					<MdOutlineLocalBar />
					<span> {name}</span>
				</div>
			);
		case "Non Smoking":
			return (
				<div className="flex flex-row gap-1 text-[12px] 2xl:text-[16px] items-center">
					{" "}
					<IoLogoNoSmoking />
					<span> {name}</span>
				</div>
			);
		case "Laundry Services":
			return (
				<div className="flex flex-row gap-1 text-[12px] 2xl:text-[16px] items-center">
					{" "}
					<FaSwimmingPool />
					<span> {name}</span>
				</div>
			);
		case "Television":
			return (
				<div className="flex flex-row gap-1 text-[12px] 2xl:text-[16px] items-center">
					{" "}
					<MdMonitor />
					<span> {name}</span>
				</div>
			);
		case "Internet":
			return (
				<div className="flex flex-row gap-1 text-[12px] 2xl:text-[16px] items-center">
					{" "}
					<FaWifi />
					<span> {name}</span>
				</div>
			);
		case "Restaurant":
			return (
				<div className="flex flex-row gap-1 text-[12px] 2xl:text-[16px] items-center">
					{" "}
					<MdRestaurant />
					<span> {name}</span>
				</div>
			);
		case "ATM":
			return (
				<div className="flex flex-row gap-1 text-[12px] 2xl:text-[16px] items-center">
					{" "}
					<MdAtm />
					<span> {name}</span>
				</div>
			);
		case "Barbeque":
			return (
				<div className="flex flex-row gap-1 text-[12px] 2xl:text-[16px] items-center">
					{" "}
					<GiBarbecue />
					<span> {name}</span>
				</div>
			);
		case "Disable Friendly":
			return (
				<div className="flex flex-row gap-1 text-[12px] 2xl:text-[16px] items-center">
					{" "}
					<TbDisabled />
					<span> {name}</span>
				</div>
			);
		case "Fitness Facility":
			return (
				<div className="flex flex-row gap-1 text-[12px] 2xl:text-[16px] items-center">
					{" "}
					<IoIosFitness />
					<span> {name}</span>
				</div>
			);
		case "Airport Shuttle":
			return (
				<div className="flex flex-row gap-1 text-[12px] 2xl:text-[16px] items-center">
					{" "}
					<MdAirportShuttle />
					<span> {name}</span>
				</div>
			);
		case "Room service":
			return (
				<div className="flex flex-row gap-1 text-[12px] 2xl:text-[16px] items-center">
					{" "}
					<TbDisabled />
					<span> {name}</span>
				</div>
			);
		case "Library":
			return (
				<div className="flex flex-row gap-1 text-[12px] 2xl:text-[16px] items-center">
					{" "}
					<IoLibrary />
					<span> {name}</span>
				</div>
			);
		case "Lounge":
			return (
				<div className="flex flex-row gap-1 text-[12px] 2xl:text-[16px] items-center">
					{" "}
					<GrLounge />
					<span> {name}</span>
				</div>
			);
		case "Multilingual":
			return (
				<div className="flex flex-row gap-1 text-[12px] 2xl:text-[16px] items-center">
					{" "}
					<FaLanguage />
					<span> {name}</span>
				</div>
			);
		case "Concierge Services":
			return (
				<div className="flex flex-row gap-1 text-[12px] 2xl:text-[16px] items-center">
					{" "}
					<FaConciergeBell />
					<span> {name}</span>
				</div>
			);
		case "Currency Exchange":
			return (
				<div className="flex flex-row gap-1 text-[12px] 2xl:text-[16px] items-center">
					{" "}
					<BsCurrencyExchange />
					<span> {name}</span>
				</div>
			);
		case "Golf":
			return (
				<div className="flex flex-row gap-1 text-[12px] 2xl:text-[16px] items-center">
					{" "}
					<GiGolfFlag />
					<span> {name}</span>
				</div>
			);

		case "Pets Allowed":
			return (
				<div className="flex flex-row gap-1 text-[12px] 2xl:text-[16px] items-center">
					{" "}
					<MdPets />
					<span> {name}</span>
				</div>
			);
		case "Spa":
			return (
				<div className="flex flex-row gap-1 text-[12px] 2xl:text-[16px] items-center">
					{" "}
					<TbMassage />
					<span> {name}</span>
				</div>
			);
		case "Billiards":
			return (
				<div className="flex flex-row gap-1 text-[12px] 2xl:text-[16px] items-center">
					{" "}
					<RiBilliardsFill />
					<span> {name}</span>
				</div>
			);
		case "Casino":
			return (
				<div className="flex flex-row gap-1 text-[12px] 2xl:text-[16px] items-center">
					{" "}
					<MdCasino />
					<span> {name}</span>
				</div>
			);
		case "Childcare Service":
			return (
				<div className="flex flex-row gap-1 text-[12px] 2xl:text-[16px] items-center">
					{" "}
					<MdChildCare />
					<span> {name}</span>
				</div>
			);
		case "Medical":
			return (
				<div className="flex flex-row gap-1 text-[12px] 2xl:text-[16px] items-center">
					{" "}
					<MdMedicalServices />
					<span> {name}</span>
				</div>
			);
		case "Tennis":
			return (
				<div className="flex flex-row gap-1 text-[12px] 2xl:text-[16px] items-center">
					{" "}
					<MdSportsTennis />
					<span> {name}</span>
				</div>
			);
		case "Sauna":
			return (
				<div className="flex flex-row gap-1 text-[12px] 2xl:text-[16px] items-center">
					{" "}
					<FaHotTub />
					<span> {name}</span>
				</div>
			);
		case "Safe deposit box":
			return (
				<div className="flex flex-row gap-1 text-[12px] 2xl:text-[16px] items-center">
					{" "}
					<BsSafeFill />
					<span> {name}</span>
				</div>
			);
		case "Night Club":
			return (
				<div className="flex flex-row gap-1 text-[12px] 2xl:text-[16px] items-center">
					{" "}
					<SiDiscogs />
					<span> {name}</span>
				</div>
			);
		case "Suite":
			return (
				<div className="flex flex-row gap-1 text-[12px] 2xl:text-[16px] items-center">
					{" "}
					<MdAirlineSeatIndividualSuite />
					<span> {name}</span>
				</div>
			);
		case "Karaoke":
			return (
				<div className="flex flex-row gap-1 text-[12px] 2xl:text-[16px] items-center">
					{" "}
					<GiMicrophone />
					<span> {name}</span>
				</div>
			);
		default:
			return name;
	}
}

export default function AmenityList({ amenitiesList, number }) {
	const desiredAmenities = ["Wifi", "Non Smoking", "Bar"];
	let selectedAmenities = [];

	// Select desired amenities that are present in the amenitiesList
	selectedAmenities = amenitiesList
		.filter((amenity) => {
			return desiredAmenities.includes(amenity.name);
		})
		.slice(0, 3);

	// If no desired amenities are present, select a random amenity that has only one word
	while (selectedAmenities.length < 3) {
		const randomAmenity = amenitiesList.find((amenity) => {
			const amenityName = amenity.name;
			const amenityWords = amenityName ? amenityName.split(" ") : [];
			return amenityWords.length === 1 && !selectedAmenities.includes(amenity);
		});

		if (randomAmenity) {
			selectedAmenities.push(randomAmenity);
		} else {
			break; // exit the loop if no random amenity is found
		}
	}
	return (
		<ul className="flex flex-row  w-full justify-around">
			{selectedAmenities.map((amenity) => (
				<div key={amenity.id}>
					<li className="flex flex-row justify-between">{getAmenityIcon(amenity.name)}</li>
					<div className="mt-1.5 bg-[#5C6A7A] w-[1px]" style={{ height: "initial" }}></div>
				</div>
			))}
			<Popup
				trigger={
					<button className="font-[600] text-[#1893F8] text-[12px] 2xl:text-[16px] hover:underline">
						Amenities
					</button>
				}
				modal
			>
				{(close) => (
					<>
						<div className=" px-3.5 py-4  shadow-xl w-[300px] md:w-[450px] h-[300px] overflow-y-auto rounded-md bg-white">
							<div className="w-full flex justify-between items-center">
								<button className="font-[600] text-[17px]">Amenities</button>
								<div
									className="bg-[#F5F5F6] cursor-pointer border-none rounded-full px-2 py-2 mt-1 items-center justify-center "
									onClick={() => {
										close();
									}}
								>
									<svg
										width="15"
										height="14"
										viewBox="0 0 15 14"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M13.3327 1.1665L1.66602 12.8332"
											stroke="#282C3F"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<path
											d="M1.66602 1.1665L13.3327 12.8332"
											stroke="#282C3F"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</div>
							</div>
							<div className="grid grid-cols-2 gap-2 justify-between">
								{amenitiesList.map((amenity) => (
									<span
										// onMouseEnter={() => handleMouseEnter(amenity)}
										// onMouseLeave={handleMouseLeave}
										key={amenity.id}
									>
										{getAmenityIcon(amenity.name)}
										{/* {hoveredItem === amenity && <span className='absolute'>{amenity.name}</span>} */}
									</span>
								))}
							</div>
						</div>
					</>
				)}
			</Popup>
		</ul>
	);
}

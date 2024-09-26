"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  APIProvider,
  Map,
  useMap,
  AdvancedMarker,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import {
  MarkerClusterer,
  SuperClusterAlgorithm,
} from "@googlemaps/markerclusterer";

import HotelListingCard from "../sections/hotel-listing/HotelListingCard";
import { getCurrencySymbol } from "@/utils/hotel-detail-helper";

export default function AllHotelsMaps({
  currency,
  hotels,
  lat,
  lng,
  noOfDays,
  noOfRooms,
}) {
  const [showMap, setShowMap] = useState(false);

  return (
    <div id="all-hotels-map" style={{ width : "100%" }}>
      {showMap ? (
        <APIProvider apiKey="AIzaSyA2Ej5QwZY0G3d_jyYdDRgI1T00kGYnEpA">
          <div
            style={{ height: "150px", width: "100%" }}
            className="border-2 border-transparent rounded-xl shadow overflow-hidden"
          >
            <Map
              mapId={"bf51a910020fa25a"}
              center={{ lat: parseFloat(lat), lng: parseFloat(lng) }}
              zoom={12}
            >
              <Markers
                points={hotels}
                currency={currency}
                noOfDays={noOfDays}
                noOfRooms={noOfRooms}
              />
            </Map>
          </div>
        </APIProvider>
      ) : (
        <div className="cursor-pointer rounded-xl shadow overflow-hidden">
          <Image
            id="all-hotels-default-image"
            onClick={() => setShowMap(true)}
            src="/img/map-filter.png"
            alt="mapFIlter"
            className="object-cover w-full  min-h-[160px]"
            height={150}
            width={300}
          />
        </div>
      )}
    </div>
  );
}

const Markers = ({ points, currency, noOfDays, noOfRooms }) => {
  const map = useMap();
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const [markers, setMarkers] = useState({});
  const clusterer = useRef(null);

  // Initialize MarkerClusterer
  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({
        map,
        algorithm: new SuperClusterAlgorithm({ radius: 200 }),
      });
    }
  }, [map]);

  // Update markers
  useEffect(() => {
    clusterer.current?.clearMarkers();
    clusterer.current?.addMarkers(Object.values(markers));
  }, [markers]);

  const setMarkerRef = (marker, key) => {
    if (marker && markers[key]) return;
    if (!marker && !markers[key]) return;

    setMarkers((prev) => {
      if (marker) {
        return { ...prev, [key]: marker };
      } else {
        const newMarkers = { ...prev };
        delete newMarkers[key];
        return newMarkers;
      }
    });
  };

  function handClick(hotel) {
    setSelectedHotel(hotel);
    setIsWindowOpen((prev) => !prev);
  }

  return (
    <>
      {points.map((hotel) => (
        <MarkerWithInfoWindow
          key={hotel.id}
          currency={currency}
          hotel={hotel}
          setMarkerRef={setMarkerRef}
          handClick={handClick}
        />
      ))}
      {isWindowOpen && (
        <InfoWindow
          position={{
            lat: parseFloat(selectedHotel.geoCode.lat),
            lng: parseFloat(selectedHotel.geoCode.long),
          }}
          maxWidth={1000}
          onCloseClick={() => setIsWindowOpen(false)}
        >
          <HotelListingCard
            key={selectedHotel.id}
            hotel={selectedHotel}
            noOfDays={noOfDays}
            noOfRooms={noOfRooms}
            showRatings={false}
            origin="all-hotels-maps"
          />
        </InfoWindow>
      )}
    </>
  );
};

const MarkerWithInfoWindow = ({ currency, hotel, setMarkerRef, handClick }) => {
  return (
    <>
      <AdvancedMarker
        ref={(marker) => setMarkerRef(marker, hotel.id)}
        position={{
          lat: parseFloat(hotel.geoCode.lat),
          lng: parseFloat(hotel.geoCode.long),
        }}
        onClick={() => handClick(hotel)}
      >
        <div className="bg-[#1893F8] text-white rounded-full  p-2">
          {getCurrencySymbol(currency)} {hotel.rate.dailyTotalRate}
        </div>
      </AdvancedMarker>
    </>
  );
};

"use client";

import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

export default function HotelMap({ id, lat, lng, zoom = 13, height = "250px"}) {
  const position = { lat: parseFloat(lat), lng: parseFloat(lng) };

  return (
    <APIProvider apiKey={"AIzaSyA9zeSrKXlgbBr0Jfkzz_2XZzg1G6ES5IE"}>
      <div
        id="hotel-map"
        style={{ height: height, width: "100%" }}
        className="border-2 border-transparent rounded-xl shadow overflow-hidden"
      >
        <Map id={id} center={position} zoom={zoom}>
          <Marker position={position} />
        </Map>
      </div>
    </APIProvider>
  );
}

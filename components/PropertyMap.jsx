"use client";
import { setDefaults, fromAddress } from "react-geocode";
import { useEffect, useState } from "react";
import Map, { Marker } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import Image from "next/image";
import pin from "@/assets/images/pin.svg";
import Spinner from "./Spinner";

const PropertyMap = ({ property }) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 12,
    width: "100%",
    height: "500px",
  });
  const [loading, setLoading] = useState(true);
  const [geocodeError, setGeocodeError] = useState(false);

  setDefaults({
    key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
    language: "en",
    region: "us",
  });

  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const res = await fromAddress(
          `${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`
        );

        if (res.results.length === 0) {
          setGeocodeError(true);
          setLoading(false);
          return;
        }

        const { lat, lng } = res.results[0].geometry.location;
        setLat(lat);
        setLng(lng);
        setViewport({
          ...viewport,
          latitude: lat,
          longitude: lng,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching coordinates:", error);
        setGeocodeError(true);
        setLoading(false);
      }
    };

    fetchCoords();
  }, [property]);

  if (loading) return <Spinner loading={loading} />;
  if (geocodeError) return <div>Error loading map</div>;

  return (
    <Map
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      initialViewState={viewport}
      style={{ width: "100%", height: 500 }}
      mapStyle="mapbox://styles/mapbox/streets-v12"
    >
      {lat && lng && (
        <Marker latitude={lat} longitude={lng}>
          <Image src={pin} width={40} height={40} alt="location" />
        </Marker>
      )}
    </Map>
  );
};

export default PropertyMap;

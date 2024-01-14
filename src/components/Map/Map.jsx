import React, { useCallback, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { Box } from "@mui/material";

const Map = ({ shops }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAAkhpiyn0ADrOC0jqxY0nZVDF-6Sdi8X0",
    libraries: ["marker", "places"],
  });

  const [map, setMap] = React.useState(null);

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const [markers, setMarkers] = React.useState([]);

  useEffect(() => {
    if (isLoaded && map && shops) {
      // Clear existing markers
      markers.forEach((marker) => marker.setMap(null));
      // console.log("Shop Data:", shops);
      // Create new markers
      const newMarkers = shops.map((shop) => {
        // Convert latitude and longitude to numbers
        const lat = parseFloat(shop.latitude);
        const lng = parseFloat(shop.longitude);
        return new window.google.maps.Marker({
          position: { lat, lng },
          map,
          title: shop.name,
        });
      });
      // Set the new markers
      setMarkers(newMarkers);
    }
  }, [isLoaded, map, shops]);

  return isLoaded ? (
    <Box>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "360px" }}
        center={{ lat: 30.036435, lng: 31.265339 }}
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnmount}
      ></GoogleMap>
    </Box>
  ) : (
    <></>
  );
};

export default Map;

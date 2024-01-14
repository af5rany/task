import React, { useState } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import PlacesAutocomplete from "react-places-autocomplete";
function LocationSearchInput({ onLocationSelect }) {
  const [address, setAddress] = useState("");
  // const handleSelect = async (description) => {
  //   const results = await getGeocode({ address: description });
  //   const latLng = getLatLng(results[0]);
  //   setAddress(description);
  //   onLocationSelect({
  //     address: description,
  //     latitude: latLng.lat,
  //     longitude: latLng.lng,
  //   });
  // };

  const handleSelect = (selectedAddress) => {
    geocodeByAddress(selectedAddress)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => console.log("Success", latLng))
      .catch((error) => console.error("Error", error));
  };
  const handleChange = (newAddress) => {
    setAddress(newAddress);
  };

  return (
    <></>
    // <PlacesAutocomplete
    //   value={address}
    //   onChange={handleChange}
    //   onSelect={handleSelect}
    // >
    //   {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
    //     <div>
    //       <input
    //         {...getInputProps({
    //           placeholder: "Search Places ...",
    //           className: "location-search-input",
    //         })}
    //       />
    //       <div className="autocomplete-dropdown-container">
    //         {loading && <div>Loading...</div>}
    //         {suggestions.map((suggestion) => {
    //           const className = suggestion.active
    //             ? "suggestion-item--active"
    //             : "suggestion-item";
    //           // inline style for demonstration purpose
    //           const style = suggestion.active
    //             ? { backgroundColor: "#fafafa", cursor: "pointer" }
    //             : { backgroundColor: "#ffffff", cursor: "pointer" };
    //           return (
    //             <div
    //               {...getSuggestionItemProps(suggestion, {
    //                 className,
    //                 style,
    //               })}
    //             >
    //               <span>{suggestion.description}</span>
    //             </div>
    //           );
    //         })}
    //       </div>
    //     </div>
    //   )}
    // </PlacesAutocomplete>
  );
}

export default LocationSearchInput;

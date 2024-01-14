import React, { useState } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import PlacesAutocomplete from "react-places-autocomplete";

function LocationSearchInput({ onLocationSelect }) {
  const [address, setAddress] = useState("");

  const handleSelect = async (description) => {
    const results = await getGeocode({ address: description });
    const latLng = getLatLng(results[0]);
    setAddress(description);
    onLocationSelect({
      address: description,
      latitude: latLng.lat,
      longitude: latLng.lng,
    });
  };
  return (
    <PlacesAutocomplete
      value={address}
      onChange={setAddress}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <input {...getInputProps({ placeholder: "Type address" })} />

          <div>
            {loading ? <div>...loading</div> : null}

            {suggestions.map((suggestion) => {
              const style = {
                backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
              };

              return (
                <div {...getSuggestionItemProps(suggestion, { style })}>
                  {suggestion.description}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
}

export default LocationSearchInput;

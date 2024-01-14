import React, { useState } from "react";
import { TextField, Paper, List, ListItem, ListItemText } from "@mui/material";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

function LocationSearchInput({ setLatLng, setLocationAddress }) {
  const [address, setAddress] = useState("");

  const handleSelect = async (selectedAddress) => {
    try {
      const results = await geocodeByAddress(selectedAddress);
      const latLng = await getLatLng(results[0]);
      setLatLng(latLng);
      setLocationAddress(selectedAddress);
    } catch (error) {
      console.error("Error", error);
    }
  };
  const handleChange = (newAddress) => {
    setAddress(newAddress);
  };

  return (
    <PlacesAutocomplete
      value={address}
      onChange={handleChange}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <TextField
            {...getInputProps({
              label: "Search Places ...",
              variant: "outlined",
              fullWidth: true,
              margin: "normal",
              className: "location-search-input",
            })}
          />
          <Paper
            style={{
              maxHeight: "200px", // Adjust the max height as needed
              overflowY: "auto", // Enable vertical scrolling
              zIndex: 1000, // Set your desired zIndex value
            }}
          >
            <List>
              {loading && <ListItem>Loading...</ListItem>}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                const style = suggestion.active
                  ? { backgroundColor: "#fafafa", cursor: "pointer" }
                  : { backgroundColor: "#ffffff", cursor: "pointer" };
                return (
                  <ListItem
                    key={suggestion.placeId}
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <ListItemText primary={suggestion.description} />
                  </ListItem>
                );
              })}
            </List>
          </Paper>
        </div>
      )}
    </PlacesAutocomplete>
  );
}

export default LocationSearchInput;

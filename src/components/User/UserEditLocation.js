import React, { useState, useEffect } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

export default function UserEditLocation(props) {
  const [state, setState] = useState();
  const handleChange = (address) => {
    setState(address );
  };
  useEffect(() => {
    setState(props.locate);
  }, [props.locate]);

  const handleSelect = (address) => {
    setState(address );
    geocodeByAddress(address)
      .then((results) => {
        props.location(results[0].formatted_address);
        getLatLng(results[0]);
      })
      .then((latLng) => props.latlng(latLng))
      .catch((error) => console.error("Error", error));
  };

  return (
    <div>
      <PlacesAutocomplete
        value={state}
        onChange={handleChange}
        onSelect={handleSelect}
        defaultValue={props.locate}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                className: "md:w-full py-4 text-center location-search-input",
              })}
            />

            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                const style = suggestion.active
                  ? { backgroundColor: "#fafafa", cursor: "pointer" }
                  : { backgroundColor: "#ffffff", cursor: "pointer" };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
}

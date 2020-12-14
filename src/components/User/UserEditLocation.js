import React, { useState, useEffect } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

export default function UserEditLocation(props) {
  const [state, setState] = useState('');
  const handleChange = (address) => {
    setState(address);
  };
  useEffect(() => {
    setState(props.locate);
  }, [props.locate]);

  const handleSelect = (address) => {
    setState(address);
    geocodeByAddress(address)
      .then((results) => {
        props.location(results[0].formatted_address);
        getLatLng(results[0]).then((res) => {
          props.latlng(res);
        });
      })
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
                className: "bg-gray-100 p-3 focus:border-blue-300 focus:outline-none focus:ring border-black h-10 shadow-inner border w-full rounded-lg location-search-input",
              })}
            />

            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? "bg-gray-100 border-black h-10 shadow-inner border w-full rounded-lg"
                  : "bg-gray-100 border-black h-10 shadow-inner border w-full rounded-lg";
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

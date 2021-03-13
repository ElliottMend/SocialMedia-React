import React, { useState, useEffect } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { IState, ILatLng } from "./UserEditContainer";
interface IProps {
  getLatLng: (e: ILatLng) => Promise<void>;
  getLocation: (e: string) => Promise<void>;
  data: IState;
}
export default function UserEditLocation(props: IProps) {
  const [state, setState] = useState<string>();
  const handleChange = (address: any) => {
    setState(address);
  };
  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) setState(props.data.location);
    return () => {
      isCancelled = true;
    };
  }, [props.data.location]);

  const handleSelect = (address: string) => {
    setState(address);
    geocodeByAddress(address)
      .then((results) => {
        props.getLocation(results[0].formatted_address);
        getLatLng(results[0]).then((res) => {
          props.getLatLng(res);
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
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                className:
                  "bg-gray-100 p-3 focus:border-blue-300 focus:outline-none focus:ring border-black h-10 shadow-inner border w-full rounded-lg location-search-input",
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

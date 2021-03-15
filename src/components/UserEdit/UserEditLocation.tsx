import React from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import { IState } from "./UserEditContainer";
interface IProps {
  handleChange: (e: string) => void;
  data: IState;
  handleSelect: (e: string) => void;
}
export const UserEditLocation = (props: IProps) => {
  return (
    <div>
      <PlacesAutocomplete
        value={props.data.location}
        onChange={props.handleChange}
        onSelect={props.handleSelect}
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
};

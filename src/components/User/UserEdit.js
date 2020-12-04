import React from "react";
import UserEditLocation from "./UserEditLocation";

export default function UserEdit(props) {
  return (
    <div>
      <div className="flex flex-col align-middle my-20 md:my-40 md:mx-20 items-center shadow-xl">
        <form
          className="flex m-10 md:m-20 flex-col"
          onSubmit={props.editSubmit}
        >
          <textarea
            className="h-20 md:h-40 bg-gray-200 md:w-full text-center"
            name="bio"
            defaultValue={props.data.bio}
            onChange={props.handleChange}
            placeholder="About Me"
            required
          />
          <div className="mx-auto">
            <input
              name="image"
              className="border-2 border-black bg-white m-10"
              onChange={props.fileSelectedHandler}
              type="file"
            />
          </div>
          {props.locate && (
            <UserEditLocation
              locate={props.locate}
              latlng={props.getLatLng}
              location={props.getLocation}
              required
            />
          )}

          <button>Submit</button>
        </form>
      </div>
    </div>
  );
}

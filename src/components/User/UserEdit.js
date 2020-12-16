import React from "react";
import UserEditLocation from "./UserEditLocation";

export default function UserEdit(props) {
  return (
    <div>
      <div className="flex flex-col  bg-gray-200 align-middle my-20 md:my-40 md:mx-20 items-center shadow-xl">
        <form
          className="flex m-10 items-center justify-center md:m-20 flex-col"
          onSubmit={props.editSubmit}
        >
          <textarea
            className="h-20 md:h-40 bg-gray-100 w-10/12 md:w-full text-center bg-gray-100 p-3 focus:border-blue-300 focus:outline-none focus:ring border-black shadow-inner border rounded-lg "
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
          <UserEditLocation
            locate={props.locate}
            latlng={props.getLatLng}
            location={props.getLocation}
            required
          />

          <button className="my-4 border-black border-2 w-20 h-12">Submit</button>
        </form>
      </div>
    </div>
  );
}

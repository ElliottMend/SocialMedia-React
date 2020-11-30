import React, { useEffect, useState } from "react";
import axios from "axios";
import UserEditLocation from "./UserEditLocation";
import { Redirect } from "react-router-dom";

export default function UserEdit({ auth }) {
  const [locate, setLocate] = useState();
  const [locat, setLocation] = useState();
  const [state, setState] = useState({});
  useEffect(() => {
    // auth()
    getUser();
  }, []);

  const getUser = async () => {
    const res = await axios({
      method: "post",
      url: "https://cors-anywhere.herokuapp.com/https://social-mediasite.herokuapp.com/getUser",
      data: { user: localStorage.getItem("username") },
    });
    await setLocate({ locate: res.data.location });
    await setLocation({ latLng: res.data.latlng });

    await setState({
      ...state,
      bio: res.data.bio,
    });
  };
  const fileSelectedHandler = async (e) => {
    await setState({ selectedFile: e.target.files[0] });
  };
  const handleChange = (e) => {
    setState({ [e.target.name]: e.target.value });
  };
  const getLatLng = async (e) => {
    await setLocation({ ...locat, latLng: e });
  };
  const getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };
  const getLocation = async (e) => {
    await setLocate({ locate: e });
  };
  const editSubmit = async (e) => {
    e.preventDefault();
    if (state.selectedFile) {
      getBase64(state.selectedFile, (result) => {
        axios({
          method: "put",
          url: "https://cors-anywhere.herokuapp.com/https://social-mediasite.herokuapp.com/userEdit",
          data: {
            user: localStorage.getItem("username"),
            bio: state.bio,
            image: result,
            location: locate.locate,
            latlng: locat.latLng,
          },
        });
      });
    } else {
      axios({
        method: "put",
        url: "https://cors-anywhere.herokuapp.com/https://social-mediasite.herokuapp.com/userEdit",
        data: {
          user: localStorage.getItem("username"),
          bio: state.bio,
          location: locate.locate,
          latlng: locat.latLng,
        },
      });
    }
    setTimeout(() => {
      setState({ redirect: true });
    }, 150);
  };
  return (
    <div>
      {state.redirect && (
        <Redirect to={`/user/${localStorage.getItem("username")}`} />
      )}
      <div className="flex flex-col align-middle my-20 md:my-40 md:mx-20 items-center bg-gray-400">
        <form className="flex md:m-20 flex-col" onSubmit={editSubmit}>
          <textarea
            className="h-20 md:h-40 md:w-full text-center"
            name="bio"
            defaultValue={state.bio}
            onChange={handleChange}
            placeholder="About Me"
            required
          />
          <div className="mx-auto">
            <input
              name="image"
              className="border-2 border-black bg-white m-10"
              onChange={fileSelectedHandler}
              type="file"
            />
          </div>
          {locate && (
            <UserEditLocation
              locate={locate}
              latlng={getLatLng}
              location={getLocation}
              required
            />
          )}
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
}

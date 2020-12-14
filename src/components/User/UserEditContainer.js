import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import UserEdit from "./UserEdit";
import { useHistory } from "react-router-dom";
import { usernameContext } from "../Context/usernameContext";
export const UserEditContainer = () => {
  const history = useHistory();
  const [locate, setLocate] = useState();
  const [locat, setLocation] = useState();
  const [user] = useState(useContext(usernameContext));
  const [state, setState] = useState({ bio: "" });
  useEffect(() => {
    axios({
      method: "get",
      url: "https://social-mediasite.herokuapp.com/getUser",
      withCredentials: true,
    }).then((res) => {
      setLocate(res.data.location);
      setLocation(res.data.latlng);
      setState({
        ...state,
        bio: res.data.bio,
      });
    });
  }, []);

  const fileSelectedHandler = async (e) => {
    setState({ ...state, selectedFile: e.target.files[0] });
  };
  const handleChange = (e) => {
    setState({ ...state, bio: e.target.value });
  };
  const getLatLng = async (e) => {
    setLocation(e);
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
    setLocate(e);
  };
  const editSubmit = async (e) => {
    e.preventDefault();
    if (state.selectedFile) {
      getBase64(state.selectedFile, (result) => {
        axios({
          method: "put",
          url: "https://social-mediasite.herokuapp.com/userEdit",
          data: {
            bio: state.bio,
            image: result,
            location: locate,
            latlng: locat,
          },
          withCredentials: true,
        });
      });
    } else {
      axios({
        method: "put",
        url: "https://social-mediasite.herokuapp.com/userEdit",
        data: {
          bio: state.bio,
          location: locate,
          latlng: locat,
        },
        withCredentials: true,
      });
    }
    setTimeout(() => {
      history.push(`/user/${user}`);
    }, 150);
  };
  return (
    <div>
      <UserEdit
        getLocation={getLocation}
        editSubmit={editSubmit}
        getLatLng={getLatLng}
        fileSelectedHandler={fileSelectedHandler}
        handleChange={handleChange}
        locate={locate}
        data={state}
      />
    </div>
  );
};

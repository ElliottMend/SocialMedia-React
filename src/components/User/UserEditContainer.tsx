import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import UserEdit from "./UserEdit";
import { useHistory, Redirect } from "react-router-dom";
import { usernameContext } from "../Context/usernameContext";

export interface ILatLng {
  lat: number;
  lng: number;
}
export interface IState {
  bio: string;
  selectedFile: any;
  location: string;
  latlng: ILatLng;
}
export default function UserEditContainer() {
  const history = useHistory();
  const [user] = useState(useContext(usernameContext));
  const [file, setFile] = useState<File | undefined>();
  const [state, setState] = useState<IState>({
    bio: "",
    selectedFile: null,
    location: "",
    latlng: { lat: 0, lng: 0 },
  });
  const currUser = window.location.pathname.split("/")[2];
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    if (currUser === user) {
      axios({
        method: "get",
        url: "http://localhost:5000/getUserEdit",
        withCredentials: true,
      }).then((res) => {
        setState(res.data);
      });
    } else {
      setRedirect(true);
    }
  }, []);

  const fileSelectedHandler = async (
    e: React.ChangeEvent<HTMLInputElement> | null
  ) => {
    if (e?.target.files) {
      setFile(e.target.files[0]);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setState({ ...state, bio: e.target.value });
  };
  const getLatLng = async (e: ILatLng) => {
    setState({ ...state, latlng: e });
  };
  const getBase64 = (
    file: File,
    cb: (e: string | ArrayBuffer | null) => void
  ) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (error) {};
  };
  const getLocation = async (e: string) => {
    setState({ ...state, location: e });
  };
  const editSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (file) {
      getBase64(state.selectedFile, (result: string | ArrayBuffer | null) => {
        axios({
          method: "put",
          url: "http://localhost:5000/userEdit",
          data: {
            bio: state.bio,
            image: result,
            location: state.location,
            latlng: state.latlng,
          },
          withCredentials: true,
        });
      });
    } else {
      axios({
        method: "put",
        url: "http://localhost:5000/userEdit",
        data: {
          bio: state.bio,
          location: state.location,
          latlng: state.latlng,
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
        data={state}
      />
      {redirect && <Redirect to="/" />}
    </div>
  );
}

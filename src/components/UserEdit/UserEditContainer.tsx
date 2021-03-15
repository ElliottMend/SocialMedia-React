import React, { useState, useEffect, useContext } from "react";
import { axiosInstance } from "../../App";
import UserEdit from "./UserEdit";
import { useHistory, Redirect } from "react-router-dom";
import { usernameContext } from "../Context/usernameContext";

export interface ILatLng {
  lat: number;
  lng: number;
}
export interface IState {
  bio: string;
  photo: string | ArrayBuffer | null;
  location: string;
  latlng: ILatLng;
}
export default function UserEditContainer() {
  const history = useHistory();
  const [user] = useState(useContext(usernameContext));
  const [state, setState] = useState<IState>({
    bio: "",
    photo: "",
    location: "",
    latlng: { lat: 0, lng: 0 },
  });
  const currUser = window.location.pathname.split("/")[2];
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    let isCancelled = false;
    if (currUser === user) {
      axiosInstance.get<IState>("getUserEdit", {}).then((res) => {
        if (!isCancelled) setState(res.data);
      });
    } else {
      if (!isCancelled) {
        setRedirect(true);
      }
    }
    return () => {
      isCancelled = true;
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setState({ ...state, bio: e.target.value });
  };
  const editSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    axiosInstance({
      method: "put",
      url: "userEdit",
      data: {
        bio: state.bio,
        image: state.photo,
        location: state.location,
        latlng: state.latlng,
      },
    });
    setTimeout(() => {
      history.push(`/user/${user}`);
    }, 150);
  };
  return (
    <div>
      <UserEdit
        editSubmit={editSubmit}
        handleChange={handleChange}
        data={state}
        setState={setState}
      />
      {redirect && <Redirect to="/" />}
    </div>
  );
}

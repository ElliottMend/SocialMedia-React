import { useState, useEffect } from "react";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { IState } from "./UserEditContainer";
import { UserEditLocation } from "./UserEditLocation";
import { Loader } from "@googlemaps/js-api-loader";
import { axiosInstance } from "../../App";
interface IProps {
  data: IState;
}

export default function UserEditLocationContainer(props: IProps) {
  const [state, setState] = useState<string>("");
  const handleChange = (address: string) => {
    setState(address);
  };
  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) setState(props.data.location);
    // const loader = new Loader({
    //   apiKey: apiKey,
    //   version: "weekly",
    // });

    return () => {
      isCancelled = true;
    };
  }, [state]);
  const getApiKey = () => {
    axiosInstance.get("");
  };
  const handleSelect = (address: string) => {
    geocodeByAddress(address)
      .then((results) => {
        setState(results[0].formatted_address);
        getLatLng(results[0]).then((res) => {
          console.log(res);
          // getLatLng(res);
        });
      })
      .catch((error) => console.error("Error", error));
  };

  return (
    <UserEditLocation
      handleSelect={handleSelect}
      handleChange={handleChange}
      data={props.data}
    />
  );
}

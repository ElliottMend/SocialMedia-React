import React, { SetStateAction } from "react";
import { IState } from "./UserEditContainer";
interface IProps {
  setState: React.Dispatch<SetStateAction<IState>>;
}
export const UserEditPhoto = (props: IProps) => {
  const fileSelectedHandler = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      getBase64(e.target.files[0], (result: string | ArrayBuffer | null) => {
        props.setState((prevState) => ({ ...prevState, photo: result }));
      });
    }
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
  return (
    <div>
      <input
        name="image"
        className="border-2 border-black bg-white m-10"
        onChange={fileSelectedHandler}
        type="file"
      />
    </div>
  );
};

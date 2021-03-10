import React from "react";
interface IProps {
  date: number;
}
export const DateTime = (props: IProps) => {
  return (
    <div>
      {props.date < 60 ? (
        <p>{Math.round(props.date)} seconds ago</p>
      ) : props.date < 3600 ? (
        <p>{Math.round(props.date / 60)} minutes ago</p>
      ) : props.date < 86400 ? (
        <p>{Math.round(props.date / 3600)} hours ago</p>
      ) : props.date < 604800 ? (
        <p>{Math.round(props.date / 86400)} days ago</p>
      ) : props.date < 2.628e6 ? (
        <p>{Math.round(props.date / 604800)} weeks ago</p>
      ) : props.date < 31535965.4396976 ? (
        <p>{Math.round(props.date / 2592000)} months ago</p>
      ) : (
        31535965.4396976 < props.date && (
          <p>{Math.round(props.date / 31104000)} years ago</p>
        )
      )}
    </div>
  );
};

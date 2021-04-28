import moment from "moment";
interface IProps {
  date: string;
}
export const DateTime = (props: IProps) => {
  const date = moment().unix() - moment(props.date).unix();

  return (
    <div>
      {date < 60 ? (
        <p>{Math.round(date)} seconds ago</p>
      ) : date < 3600 ? (
        <p>{Math.round(date / 60)} minutes ago</p>
      ) : date < 86400 ? (
        <p>{Math.round(date / 3600)} hours ago</p>
      ) : date < 604800 ? (
        <p>{Math.round(date / 86400)} days ago</p>
      ) : date < 2.628e6 ? (
        <p>{Math.round(date / 604800)} weeks ago</p>
      ) : date < 31535965.4396976 ? (
        <p>{Math.round(date / 2592000)} months ago</p>
      ) : (
        31535965.4396976 < date && (
          <p>{Math.round(date / 31104000)} years ago</p>
        )
      )}
    </div>
  );
};

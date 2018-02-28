import moment from "moment";

const TimeFormatter = ({ date }) => {
  return moment(date).format("HH:mm");
};

export default TimeFormatter;

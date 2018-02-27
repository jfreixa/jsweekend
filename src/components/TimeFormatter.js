import moment from "moment";

const TimeFormatter = ({ date }) => {
  return moment(date).format("HH:MM");
};

export default TimeFormatter;

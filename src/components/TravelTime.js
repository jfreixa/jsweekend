import moment from "moment";

const TimeFormatter = ({ minutes }) => {
  const hours = minutes / 60;
  return `${parseInt(hours)}h ${minutes % 60}m`;
};

export default TimeFormatter;

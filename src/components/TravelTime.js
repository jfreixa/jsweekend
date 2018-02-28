import moment from "moment";

const formatNumber = number => {
  return number < 10 ? `0${number}` : `${number}`;
};

const TimeFormatter = ({ minutes }) => {
  const hours = parseInt(minutes / 60);
  return `${formatNumber(hours)}h ${formatNumber(minutes % 60)}m`;
};

export default TimeFormatter;

import Proptypes from 'prop-types';

const formatNumber = number => (number < 10 ? `0${number}` : `${number}`);

const TimeFormatter = ({ minutes }) => {
  const hours = parseInt(minutes / 60, 0);
  return `${formatNumber(hours)}h ${formatNumber(minutes % 60)}m`;
};

TimeFormatter.prototype = {
  minutes: Proptypes.number,
};

export default TimeFormatter;

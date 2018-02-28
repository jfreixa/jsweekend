import moment from 'moment';

const TimeFormatter = ({ date }) => moment(date).format('HH:mm');

export default TimeFormatter;

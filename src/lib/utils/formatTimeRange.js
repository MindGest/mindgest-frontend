const formatTime = date => new Date(date).toLocaleTimeString().slice(0, 5);
const formatDate = date =>
  new Date(date).toISOString().replace(/(\d{4})-(\d{2})-(\d{2})/, '$2/$3/$1').slice(0, 10);

export default (start, end) => `${formatTime(start)} - ${formatTime(end)}\n${formatDate(start)}`;

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import isYesterday from 'dayjs/plugin/isYesterday';
import isToday from 'dayjs/plugin/isToday';
dayjs.extend(relativeTime);
dayjs.extend(isToday);
dayjs.extend(isYesterday);

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};
const getRandomData = (arr) => {
  const randomIndex = getRandomInteger(0, arr.length - 1);
  return arr[randomIndex];
};
const getFormattedReleaseDate = (time) => dayjs(time).format('DD MMMM YYYY');

const getFormattedDuration = (totalMinutes) => {
  const minutes = totalMinutes % 60;
  const hours = (totalMinutes - minutes) / 60;
  const hoursRender = hours >= 1 ? `${hours}h ` : '';
  return `${hoursRender}${minutes}m`;
};

const humanizeCommentDate = (date) => {
  switch (true){
    case (dayjs(date).isToday()):
      return 'Today';
    case (dayjs(date).isYesterday()):
      return 'Yesterday';
    default:
      return dayjs(date).fromNow();
  }
};

export {getRandomInteger, getFormattedDuration, getRandomData, humanizeCommentDate,getFormattedReleaseDate};

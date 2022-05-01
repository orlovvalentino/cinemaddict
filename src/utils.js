import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};
const getRandomData =(arr)=>{
  const randomIndex = getRandomInteger(0, arr.length - 1);
  return arr[randomIndex];
};

const getFormattedDuration = (totalMinutes) => {
  const minutes = totalMinutes % 60;
  const hours = (totalMinutes - minutes) / 60;
  const hoursRender = hours >= 1 ? `${hours}h ` : '';
  return`${hoursRender}${minutes}m`;
};
const humanizeTaskDueDate = (dueDate) => dayjs(dueDate).format('D MMMM YYYY');
const humanizeCommentDate = (date) => dayjs(date).format('YYYY/mm/DD hh:mm');

export {getRandomInteger, getFormattedDuration,humanizeTaskDueDate,getRandomData, humanizeCommentDate};

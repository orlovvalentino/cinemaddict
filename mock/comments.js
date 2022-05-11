import {getRandomData} from '../src/utils.js';

const comments = [
  'Interesting setting and a good cast',
  'Booooooooooring',
  'Very very old. Meh',
  'Almost two hours? Seriously?',
  'Seriously?',
  'old. Meh',
  'setting and a good cast',
  'No no no',
  'Yes Yes yes',
  'Like it'
];
const author = [
  'Tim Macoveev',
  'John Doe',
  'Keks Cat',
  'Mafin Dog',
  'Orlov Valentin'
];
const emotion = ['smile', 'sleeping', 'puke', 'angry'];

export const generateComment = () =>({
  author: getRandomData(author),
  comment: getRandomData(comments),
  date: '2019-05-11T16:12:32.554Z',
  emotion: getRandomData(emotion)
});

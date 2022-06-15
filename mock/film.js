import {getRandomInteger} from '../src/utils.js';

const generateDate = () => {
  const dates = [
    '2015-07-02T00:00:00.000Z',
    '2016-06-13T00:00:00.000Z',
    '2017-05-25T00:00:00.000Z',
    '2018-04-30T00:00:00.000Z',
    '2019-03-07T00:00:00.000Z',
    '2020-02-09T00:00:00.000Z',
    '2021-01-06T00:00:00.000Z',
  ];
  const randomIndex = getRandomInteger(0, dates.length - 1);

  return dates[randomIndex];
};
const generateRating = () => {
  const ratings = [
    1.1,
    2.2,
    3.3,
    4.4,
    5.5,
    6.6,
    7.7,
    8.8,
    9.9
  ];
  const randomIndex = getRandomInteger(0, ratings.length - 1);

  return ratings[randomIndex];
};

const generateDescription = () => {
  const descriptions = [
    'Oscar-winning film, a war drama about two young people, from the creators of timeless classic "Nu, Pogodi!" and "Alice in Wonderland", with the best fight scenes since Bruce Lee.',
    'Cumsan turpis nec elit congue, sit amet aliquet felis dapibus. Mauris auctor ornare tellus. Donec maximus quis nunc in sollicitudin. Quisqu…',
    'Curabitur lacinia, lacus a egestas auctor, massa enim commodo elit, neque mauris a nunc. Donec ipsum felis, ve facilisis tortor commodo etc…',
  ];

  const randomIndex = getRandomInteger(0, descriptions.length - 1);

  return descriptions[randomIndex];
};
const generateFilmTitle = () => {
  const filmsTitles = [
    'Popeye the Sailor Meets Sindbad the Sailor',
    'Sagebrush Trail',
    'The Dance of Life',
    'The Man with the Golden Arm',
    'Santa Claus Conquers the Martians',
    'Popeye the Sailor Meets Sindbad the Sailor'
  ];

  const randomIndex = getRandomInteger(0, filmsTitles.length - 1);

  return filmsTitles[randomIndex];
};
const generatePosters = () => {
  const posters = [
    './images/posters/popeye-meets-sinbad.png',
    './images/posters/the-dance-of-life.jpg',
    './images/posters/the-man-with-the-golden-arm.jpg',
    './images/posters/the-great-flamarion.jpg'
  ];

  const randomIndex = getRandomInteger(0, posters.length - 1);

  return posters[randomIndex];
};
const getRandom = (arg) => Math.floor(Math.random() * arg);

let commentId = 0;

function range(start, end) {
  commentId = end;
  return Array(end - start + 1).fill().map((_, idx) => start + idx);
}

export const generateFilm = () => ({
  id: getRandom(1000),
  comments: range(commentId, commentId+5),
  filmInfo: {
    title: generateFilmTitle(),
    alternativeTitle: 'Laziness Who Sold Themselves',
    totalRating: generateRating(),
    poster: generatePosters(),
    ageRating: 0,
    director: 'Tom Ford',
    writers: [
      'Takeshi Kitano',
      'Dalton Trumbo'
    ],
    actors: [
      'Morgan Freeman',
      'Audrey Hepburn'
    ],
    release: {
      date: generateDate(),
      releaseCountry: 'Finland'
    },
    runtime: getRandom(200),
    genre: [
      'Comedy',
      'Horror',
      'Thriller'
    ],
    description: generateDescription()
  },
  userDetails: {
    watchlist: Math.random() < 0.5,
    alreadyWatched: Math.random() < 0.5,
    watchingDate: '2019-04-12T16:12:32.554Z',
    favorite: Math.random() < 0.5
  }
});

import {getRandomInteger} from '../src/utils.js';

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


export const generateFilm = () => ({
  id: getRandom(1000),
  comments: Array.from(new Set(Array.from(
    {length: getRandom(10)},
    () => getRandom(10)
  ))),
  filmInfo: {
    title: generateFilmTitle(),
    alternativeTitle: 'Laziness Who Sold Themselves',
    totalRating: 5.3,
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
      date: '2019-05-11T00:00:00.000Z',
      releaseCountry: 'Finland'
    },
    runtime: 77,
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

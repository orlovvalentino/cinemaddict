const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating'
};
const FilterType = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  WATCHED: 'watched',
  FAVORITE: 'favorite'
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const EmptyList = {
  all:'There are no movies in our database',
  watchlist:'There are no movies to watch now',
  watched:'There are no watched movies now',
  favorite:'There are no favorite movies now'
};

export {SortType,FilterType,UpdateType,EmptyList};

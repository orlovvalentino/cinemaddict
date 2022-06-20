import Observable from '../framework/observable';
import {FilterType} from '../const';

export default class FilterModel extends Observable {
  #films = null;

  #currentFilter = FilterType.ALL;

  #filter = {};

  constructor(filmsModel) {
    super();
    this.#films = filmsModel.films;
    this.#filter = {
      watched: () => this.#films.filter((item) => item.userDetails.alreadyWatched).length,
      watchlist: () => this.#films.filter((item) => item.userDetails.watchlist).length,
      favorites: () => this.#films.filter((item) => item.userDetails.favorite).length,
    };
  }

  get currentFilter() {
    return this.#currentFilter;
  }

  setCurrentFilter = (updateType, filter) => {
    this.#currentFilter = filter;
    this._notify(updateType, filter);
  };

  get filters() {
    return this.#filter;
  }

  get watchedRank() {
    switch (true) {
      case this.#filter.watched >= 1 &&
      this.#filter.watched <= 10:
        return 'novice';
      case this.#filter.watched >= 11 &&
      this.#filter.watched <= 20:
        return 'fun';
      case this.#filter.watched >= 21:
        return 'movie buff';
      default:
        return null;
    }
  }
}

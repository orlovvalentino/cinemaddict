import { filmsModel } from './films-model';

export default class CustomerStorageModel {
  #films = filmsModel.films;

  #customerStorage = {
    watched: this.#films.filter((item) => item.userDetails.alreadyWatched)
      .length,
    watchlist: this.#films.filter((item) => item.userDetails.watchlist).length,
    favorites: this.#films.filter((item) => item.userDetails.favorite).length,
  };

  get customerStorage() {
    return this.#customerStorage;
  }

  get watchedRank() {
    switch (true) {
      case this.#customerStorage.watched >= 1 &&
        this.#customerStorage.watched <= 10:
        return 'novice';
      case this.#customerStorage.watched >= 11 &&
        this.#customerStorage.watched <= 20:
        return 'fun';
      case this.#customerStorage.watched >= 21:
        return 'movie buff';
      default:
        return null;
    }
  }
}

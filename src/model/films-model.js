import Observable from '../framework/observable';
import {UpdateType} from '../const.js';

export default class FilmsModel extends Observable {
  #filmsApiService = null;
  #films = [];

  constructor(filmsApiService) {
    super();
    this.#filmsApiService = filmsApiService;
  }

  get films() {
    return this.#films;
  }

  init = async () => {
    try {
      const tasks = await this.#filmsApiService.films;
      this.#films = tasks.map(this.#adaptToClient);
    } catch (err) {
      this.#films = [];
    }
    this._notify(UpdateType.INIT);
  };

  set films(newFilms) {
    this.#films = newFilms;
  }

  updateFilm = async (updateType, update) => {
    const index = this.#films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting film');
    }
    try {
      const response = await this.#filmsApiService.updateFilm(update);
      const updatedTask = this.#adaptToClient(response);
      this.#films = [
        ...this.#films.slice(0, index),
        updatedTask,
        ...this.#films.slice(index + 1),
      ];
      this._notify(updateType, updatedTask);
    } catch(err) {
      throw new Error('Can\'t update task');
    }
  };

  #adaptToClient = (film) => {
    const adaptedFilm = {...film,
      filmInfo: film['film_info'],
      userDetails: film['user_details'],
    };

    adaptedFilm.filmInfo.alternativeTitle = film['film_info']['alternative_title'];
    adaptedFilm.filmInfo.ageRating = film['film_info']['age_rating'];
    adaptedFilm.filmInfo.totalRating = film['film_info']['total_rating'];
    adaptedFilm.userDetails.alreadyWatched = film['user_details']['already_watched'];
    adaptedFilm.userDetails.watchingDate = film['user_details']['watching_date'];

    delete adaptedFilm['film_info'];
    delete adaptedFilm['user_details'];
    delete adaptedFilm['filmInfo']['alternative_title'];
    delete adaptedFilm['filmInfo']['age_rating'];
    delete adaptedFilm['filmInfo']['total_rating'];
    delete adaptedFilm['userDetails']['already_watched'];
    delete adaptedFilm['userDetails']['watching_date'];

    return adaptedFilm;
  };
}

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
      const films = await this.#filmsApiService.films;
      this.#films = films.map(this.#adaptToClient);
    } catch (err) {
      this.#films = [];
    }
    this._notify(UpdateType.INIT);
  };

  set films(newFilms) {
    this.#films = newFilms;
  }

  get topRatedFilms() {
    if (this.#films.every((film, i, arr) => film.filmInfo.totalRating === arr[0].filmInfo.totalRating)) {
      if (this.#films[0].filmInfo.totalRating === 0) {
        return [];
      }
      return this.#films.sort(() => Math.random() - Math.random()).slice(0, 2);
    }
    return this.#films.sort(this.#sortFilmsByRating).slice(0, 2);
  }

  get topCommentedFilms(){
    if (this.#films.every((film, i, arr) => film.comments.length === arr[0].comments.length)) {
      if (this.#films[0].comments.length === 0) {
        return [];
      }
      return this.#films.sort(() => Math.random() - Math.random()).slice(0, 2);
    }
    return this.#films.sort(this.#sortFilmsByCommentsCount).slice(0, 2);
  }

  #sortFilmsByRating = (a,b) => b.filmInfo.totalRating - a.filmInfo.totalRating;
  #sortFilmsByCommentsCount = (a,b) => b.comments.length - a.comments.length;

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

  updateCommentFilm = (updateType, update) => {
    const index = this.#films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting film');
    }
    const updatedTask = this.#adaptToClient(update);

    this.#films = [
      ...this.#films.slice(0, index),
      updatedTask,
      ...this.#films.slice(index + 1),
    ];
    this._notify(updateType, updatedTask);
  };

  #adaptToClient = (film) => {
    const adaptedFilm = {
      ...film,
      filmInfo: film['film_info'],
      userDetails: film['user_details'],
    };

    adaptedFilm.filmInfo.release.releaseCountry = film['film_info']['release']['release_country'];
    adaptedFilm.filmInfo.alternativeTitle = film['film_info']['alternative_title'];
    adaptedFilm.filmInfo.ageRating = film['film_info']['age_rating'];
    adaptedFilm.filmInfo.totalRating = film['film_info']['total_rating'];
    adaptedFilm.userDetails.alreadyWatched = film['user_details']['already_watched'];
    adaptedFilm.userDetails.watchingDate = film['user_details']['watching_date'];

    delete adaptedFilm['film_info'];
    delete adaptedFilm['user_details'];
    delete adaptedFilm['filmInfo']['release_country'];
    delete adaptedFilm['filmInfo']['alternative_title'];
    delete adaptedFilm['filmInfo']['age_rating'];
    delete adaptedFilm['filmInfo']['total_rating'];
    delete adaptedFilm['userDetails']['already_watched'];
    delete adaptedFilm['userDetails']['watching_date'];

    return adaptedFilm;
  };
}

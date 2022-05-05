import {getFormattedDuration} from '../utils.js';
import BaseView from './base-view.js';

const createFilmTemplate = (film) => {
  const year = new Date(film.filmInfo.release.date).getFullYear();
  const duration = getFormattedDuration(film.filmInfo.runtime);

  return (`
    <article class="film-card">
      <a class="film-card__link">
        <h3 class="film-card__title">${film.filmInfo.title}</h3>
        <p class="film-card__rating">${film.filmInfo.totalRating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${year}</span>
          <span class="film-card__duration">${duration}</span>
          <span class="film-card__genre">${film.filmInfo.genre[0]}</span>
        </p>
        <img src="${film.filmInfo.poster}" alt="${film.filmInfo.title}" class="film-card__poster">
        <p class="film-card__description">${film.filmInfo.description}</p>
        <span class="film-card__comments">${film.comments.length} comments</span>
      </a>
      <div class="film-card__controls">
        <button class="film-card__controls-item film-card__controls-item--add-to-watchlist film-card__controls-item--active" type="button">Add to watchlist</button>
        <button class="film-card__controls-item film-card__controls-item--mark-as-watched film-card__controls-item--active" type="button">Mark as watched</button>
        <button class="film-card__controls-item film-card__controls-item--favorite film-card__controls-item--active" type="button">Mark as favorite</button>
      </div>
    </article>
`);
};

export default class  FilmView extends BaseView{
  #film = null;

  constructor(film) {
    super();
    this.#film = film;
  }

  get template() {
    return createFilmTemplate(this.#film);
  }
}

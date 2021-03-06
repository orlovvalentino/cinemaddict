import {getFormattedDuration,getFormattedReleaseDate} from '../utils.js';
import AbstractView from '../framework/view/abstract-view.js';

const createFilmTemplate = (film,getShortDescription) => {
  const releaseDate = getFormattedReleaseDate(film.filmInfo.release.date),
    duration = getFormattedDuration(film.filmInfo.runtime),
    description = getShortDescription();

  return (`
    <article class="film-card">
      <a class="film-card__link">
        <h3 class="film-card__title">${film.filmInfo.title}</h3>
        <p class="film-card__rating">${film.filmInfo.totalRating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${releaseDate}</span>
          <span class="film-card__duration">${duration}</span>
          <span class="film-card__genre">${film.filmInfo.genre[0]}</span>
        </p>
        <img src="${film.filmInfo.poster}" alt="${film.filmInfo.title}" class="film-card__poster">
        <p class="film-card__description">${description}</p>
        <span class="film-card__comments">${film.comments.length} comments</span>
      </a>
    </article>
`);
};

export default class FilmView extends AbstractView {
  #film = null;

  constructor(film) {
    super();
    this.#film = film;
  }

  get template() {
    return createFilmTemplate(this.#film, this.#getShortDescription);
  }

  setLinkClickHandler = (callback) => {
    this._callback.linkClick = callback;
    this.element.querySelector('.film-card__link').addEventListener('click', this.#linkClickHandler);
  };

  #getShortDescription = ()=>{
    if(this.#film.filmInfo.description.length <= 140){
      return this.#film.filmInfo.description;
    }
    return `${this.#film.filmInfo.description.substring(0,139)}&#8230;`;
  };

  #linkClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.linkClick(this.#film);
  };
}

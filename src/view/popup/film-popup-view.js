import {getFormattedDuration, getFormattedReleaseDate} from '../../utils.js';
import AbstractView from '../../framework/view/abstract-view.js';

const filmPopupTemplate = (film) => {
  const {
      title,
      poster,
      ageRating,
      alternativeTitle,
      totalRating, director, writers, actors, genre, description, release
    } = film.filmInfo,
    duration = getFormattedDuration(film.filmInfo.runtime),
    releaseDate = getFormattedReleaseDate(release.date);

  return (`
    <section class="film-details">
      <form class="film-details__inner" action="" method="get" id="formReview">
        <div class="film-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${poster}" alt="${title}">
              <p class="film-details__age">${ageRating}+</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">Original: ${alternativeTitle}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${totalRating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writers.join(', ')}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actors.join(', ')}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${releaseDate}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${duration}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${release.releaseCountry}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genres</td>
                  <td class="film-details__cell">
                    ${genre.map((it) => `<span class="film-details__genre">${it}</span>`).join('')}
                </tr>
              </table>

              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>
        </div>
        <div class="film-details__bottom-container">
            <div class="lds-dual-ring"></div>
        </div>
      </form>
    </section>
`);
};

export default class FilmPopupView extends AbstractView {
  #film = null;
  #id = null;
  #count = null;

  constructor(film, sortedComments) {
    super();
    this.#film = film;
    this.#count = sortedComments.length;
    this.#id = this.#film.id;
  }

  get id() {
    return this.#id;
  }

  get template() {
    return filmPopupTemplate(this.#film, this.#count);
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#clickHandler);
  };

  setSubmitHandler = (callback)=>{
    this._callback.submit = callback;
    const form =  this.element.querySelector('.film-details__inner');
    const formData = new FormData(form);
    this.element.querySelector('.film-details__inner').addEventListener('keydown',(event) => {
      if ((event.metaKey && event.keyCode === 13) || (event.ctrlKey && event.keyCode === 13) ) {
        this.#formSubmit(formData);
      }
    });
  };

  removeSubmitHandler = ()=>{
    delete this._callback.submit;
    this.element.querySelector('.film-details__inner').removeEventListener('keydown', this.#formSubmit);
  };

  removeClickHandler = () => {
    delete this._callback.click;
    this.element.removeEventListener('click', this.#clickHandler);
  };

  showLoader = () => {
    this.element.querySelector('.film-details__bottom-container').classList.add('loading');
  };

  hideLoader = () => {
    this.element.querySelector('.film-details__bottom-container').classList.remove('loading');
  };

  #formSubmit = (formData)=>{
    this._callback.submit(formData);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };
}

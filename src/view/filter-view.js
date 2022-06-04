import AbstractView from '../framework/view/abstract-view.js';
import {FilterType} from '../const';

const createMenuTemplate = (filters, currentFilter) => {
  const {watchlist, watched, favorites} = filters;
  const setClassActive = (filter) => currentFilter === filter ? 'main-navigation__item--active' : '';
  return (`<nav class="main-navigation">
    <a href="#all" class="main-navigation__item ${setClassActive(FilterType.ALL)}" data-filter="${FilterType.ALL}">All movies</a>
    <a href="#watchlist" class="main-navigation__item ${setClassActive(FilterType.WATCHLIST)}" data-filter="${FilterType.WATCHLIST}">Watchlist <span class="main-navigation__item-count" >${watchlist()}</span></a>
    <a href="#history" class="main-navigation__item ${setClassActive(FilterType.WATCHED)}" data-filter="${FilterType.WATCHED}">History <span class="main-navigation__item-count">${watched()}</span></a>
    <a href="#favorites" class="main-navigation__item ${setClassActive(FilterType.FAVORITE)}" data-filter="${FilterType.FAVORITE}">Favorites <span class="main-navigation__item-count">${favorites()}</span></a>
  </nav>`);
};

export default class MenuView extends AbstractView {
  constructor(filters, currentFilter) {
    super();
    this.filters = filters;
    this.currentFilter = currentFilter;
  }

  get template() {
    return createMenuTemplate(this.filters, this.currentFilter);
  }

  setAllClickHandler = (callback) => {
    this._callback.allClick = callback;
    this.element.querySelector(`[data-filter=${FilterType.ALL}]`).addEventListener('click', this.#allClickHandler);
  };

  #allClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.allClick(FilterType.ALL);
  };

  setWatchlistClickHandler = (callback) => {
    this._callback.watchlistClick = callback;
    this.element.querySelector(`[data-filter=${FilterType.WATCHLIST}]`).addEventListener('click', this.#watchlistClickHandler);
  };

  #watchlistClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchlistClick(FilterType.WATCHLIST);
  };

  setWatchedClickHandler = (callback) => {
    this._callback.WatchedClick = callback;
    this.element.querySelector(`[data-filter=${FilterType.WATCHED}]`).addEventListener('click', this.#watchedClickHandler);
  };

  #watchedClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchlistClick(FilterType.WATCHED);
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.FavoriteClick = callback;
    this.element.querySelector(`[data-filter=${FilterType.FAVORITE}]`).addEventListener('click', this.#favoriteClickHandler);
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchlistClick(FilterType.FAVORITE);
  };
}

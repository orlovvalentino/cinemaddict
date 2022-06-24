import AbstractView from '../framework/view/abstract-view.js';
import {FilterType} from '../const';

const createMenuTemplate = ( currentFilter,watched,watchlist,favorites) => {
  const setClassActive = (filter) => currentFilter === filter ? 'main-navigation__item--active' : '';
  return (`<nav class="main-navigation">
    <a href="#all" class="main-navigation__item ${setClassActive(FilterType.ALL)}" data-filter="${FilterType.ALL}">All movies</a>
    <a href="#watchlist" class="main-navigation__item ${setClassActive(FilterType.WATCHLIST)}" data-filter="${FilterType.WATCHLIST}">Watchlist <span class="main-navigation__item-count" >${watchlist()}</span></a>
    <a href="#history" class="main-navigation__item ${setClassActive(FilterType.WATCHED)}" data-filter="${FilterType.WATCHED}">History <span class="main-navigation__item-count">${watched()}</span></a>
    <a href="#favorites" class="main-navigation__item ${setClassActive(FilterType.FAVORITE)}" data-filter="${FilterType.FAVORITE}">Favorites <span class="main-navigation__item-count">${favorites()}</span></a>
  </nav>`);
};

export default class MenuView extends AbstractView {
  constructor(currentFilter,watched, watchlist, favorites) {
    super();
    this.currentFilter = currentFilter;
    this.watched = watched;
    this.watchlist = watchlist;
    this.favorites = favorites;
  }

  get template() {
    return createMenuTemplate(this.currentFilter, this.watched, this.watchlist, this.favorites);
  }

  setAllClickHandler = (callback) => {
    this._callback.allClick = callback;
    this.element.querySelector(`[data-filter=${FilterType.ALL}]`).addEventListener('click', this.#allClickHandler);
  };

  setWatchlistClickHandler = (callback) => {
    this._callback.watchlistClick = callback;
    this.element.querySelector(`[data-filter=${FilterType.WATCHLIST}]`).addEventListener('click', this.#watchlistClickHandler);
  };

  setWatchedClickHandler = (callback) => {
    this._callback.WatchedClick = callback;
    this.element.querySelector(`[data-filter=${FilterType.WATCHED}]`).addEventListener('click', this.#watchedClickHandler);
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.FavoriteClick = callback;
    this.element.querySelector(`[data-filter=${FilterType.FAVORITE}]`).addEventListener('click', this.#favoriteClickHandler);
  };

  #allClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.allClick(FilterType.ALL);
  };

  #watchlistClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchlistClick(FilterType.WATCHLIST);
  };

  #watchedClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchlistClick(FilterType.WATCHED);
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchlistClick(FilterType.FAVORITE);
  };
}

import AbstractView from '../framework/view/abstract-view.js';

const createMenuTemplate = (watchlist,watched,favorites) => (
  `<nav class="main-navigation">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchlist}</span></a>
    <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${watched}</span></a>
    <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favorites}</span></a>
  </nav>`
);

export default class MenuView extends AbstractView {
  constructor(customerStorageModel) {
    super();
    this.watchlist = customerStorageModel.customerStorage.watchlist;
    this.watched = customerStorageModel.customerStorage.watched;
    this.favorites = customerStorageModel.customerStorage.favorites;
  }

  get template() {
    return createMenuTemplate(this.watchlist,this.watched,this.favorites);
  }
}

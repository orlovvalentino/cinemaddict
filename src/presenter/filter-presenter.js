import { render } from '../framework/render.js';
import FilterView from '../view/filter-view.js';

export default class FilterPresenter {
  #filterView = null;
  #watched = null;
  #watchlist = null;
  #favorites = null;

  init = (contentContainer, customerStorageModel) => {
    this.#watched = customerStorageModel.customerStorage.watched;
    this.#watchlist = customerStorageModel.customerStorage.watchlist;
    this.#favorites = customerStorageModel.customerStorage.favorites;
    this.#filterView = new FilterView(
      this.#watched,
      this.#watchlist,
      this.#favorites
    );

    render(this.#filterView, contentContainer);
  };
}

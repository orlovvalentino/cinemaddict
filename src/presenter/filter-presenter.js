import {render,replace,remove} from '../framework/render.js';
import FilterView from '../view/filter-view.js';
import {UpdateType} from '../const';

export default class FilterPresenter {
  #contentContainer = null;
  #filterModel = null;
  #filmsModel = null;
  #filterView = null;

  constructor(contentContainer, filterModel, filmsModel) {
    this.#contentContainer = contentContainer;
    this.#filterModel = filterModel;
    this.#filmsModel = filmsModel;

    this.#filmsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  init = () => {
    const prevFilterView = this.#filterView;

    this.#filterView = new FilterView(this.#filterModel.currentFilter, this.#filterModel.filters);

    if (prevFilterView === null) {
      render(this.#filterView, this.#contentContainer);
      this.#setHandlersOnFilters();
      return;
    }

    replace(this.#filterView, prevFilterView);
    remove(prevFilterView);
    this.#setHandlersOnFilters();
  };

  #handleModelEvent = () => {
    this.init();
  };

  #setHandlersOnFilters = () => {
    this.#filterView.setAllClickHandler(this.#filterFilms);
    this.#filterView.setWatchlistClickHandler(this.#filterFilms);
    this.#filterView.setWatchedClickHandler(this.#filterFilms);
    this.#filterView.setFavoriteClickHandler(this.#filterFilms);
  };

  #filterFilms = (filter) => {
    if (filter === this.#filterModel.currentFilter) {
      return true;
    }
    this.#filterModel.setCurrentFilter(UpdateType.MAJOR, filter);
  };
}

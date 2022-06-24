import {render,replace,remove} from '../framework/render.js';
import ProfileView from '../view/profile-view.js';

export default class ProfilePresenter {
  #contentContainer = null;
  #filterModel = null;
  #filmsModel = null;
  #profileView = null;

  constructor(contentContainer, filterModel, filmsModel) {
    this.#contentContainer = contentContainer;
    this.#filterModel = filterModel;
    this.#filmsModel = filmsModel;

    this.#filmsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  init = () => {
    const prevProfileView = this.#profileView;

    this.#profileView = new ProfileView(this.#filterModel.watchedRank, this.#watched);

    if (prevProfileView === null) {
      render(this.#profileView, this.#contentContainer);
      return;
    }

    replace(this.#profileView, prevProfileView);
    remove(prevProfileView);
  };

  #watched = () => this.#filmsModel.films.filter((item) => item.userDetails.alreadyWatched).length;

  #handleModelEvent = () => {
    this.init();
  };
}

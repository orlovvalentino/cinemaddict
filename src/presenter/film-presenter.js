import FilmView from '../view/film-view';
import {render, replace, remove} from '../framework/render';
import FilmControlsView from '../view/film-controls-view';

export default class FilmPresenter {
  #film = null;
  #container = null;
  #filmComponent = null;
  #popupContainer = null;
  #commentsModel = null;
  #filmControlsComponent = null;

  constructor(film, container, popupContainer, commentsModel, updateUserDetails) {
    this.#film = film;
    this.#container = container;
    this.#popupContainer = popupContainer;
    this.#commentsModel = commentsModel;
    this.updateUserDetails = updateUserDetails;
  }

  init = () => {
    const prevFilmComponent = this.#filmComponent;
    this.#filmComponent = new FilmView(this.#film);
    if (prevFilmComponent !== null) {
      return;
    }
    render(this.#filmComponent, this.#container);
    this.#filmControlsComponent = new FilmControlsView(this.#film);
    render(this.#filmControlsComponent, this.#filmComponent.element);
    this.#setHandlersOnControls();
  };

  setLinkClickHandler = (callback) => {
    this.#filmComponent.setLinkClickHandler(callback);
  };

  updateControls = (film) => {
    const filmControlsComponentNew = new FilmControlsView(film);
    replace(filmControlsComponentNew, this.#filmControlsComponent);
    this.#filmControlsComponent = filmControlsComponentNew;
    this.#setHandlersOnControls();
  };

  destroy = () => {
    remove(this.#filmComponent);
  };

  #setHandlersOnControls = () => {
    this.#filmControlsComponent.setWatchlistClickHandler(this.updateUserDetails);
    this.#filmControlsComponent.setWatchedClickHandler(this.updateUserDetails);
    this.#filmControlsComponent.setFavoriteClickHandler(this.updateUserDetails);
  };
}

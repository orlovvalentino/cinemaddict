import FilmView from '../view/film-view';
import {render} from '../framework/render';

export default class FilmPresenter {
  #film = null;
  #container = null;
  #filmComponent = null;
  #popupContainer = null;
  #commentsModel = null;

  constructor(film, container, popupContainer, commentsModel) {
    this.#film = film;
    this.#container = container;
    this.#popupContainer = popupContainer;
    this.#commentsModel = commentsModel;
  }

  init = () => {
    this.#filmComponent = new FilmView(this.#film);
    render(this.#filmComponent, this.#container);
  };

  setClickHandler = (callback) => {
    this.#filmComponent.setClickHandler(callback);
  };
}

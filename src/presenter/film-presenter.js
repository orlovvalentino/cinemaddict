import FilmView from '../view/film-view';
import {render} from '../framework/render';
import FilmPopupPresenter from './popup-presenter';
// import FilmPopupView from '../view/film-popup-view';
// import CommentsBlockView from '../view/comments-block-view';
// import CommentView from '../view/comment-view';
// import CommentFormView from '../view/comment-form-view';

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
    this.#filmComponent.setClickHandler(this.openPopup);
  };

  openPopup = () => {
    const popup = new FilmPopupPresenter(this.#popupContainer, this.#commentsModel);
    popup.open(this.#film);
  };
}

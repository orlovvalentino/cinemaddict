import FilmView from '../view/film-view';
import {remove, render} from '../framework/render';
import FilmPopupView from '../view/film-popup-view';
import CommentsBlockView from '../view/comments-block-view';
import CommentView from '../view/comment-view';
import CommentFormView from '../view/comment-form-view';

export default class FilmPresenter {
  #film = null;
  #container = null;
  #filmPopupComponent = null;
  #filmComponent = null;
  #popupContainer = null;
  #sortedComments = [];
  #commentsModel = null;
  #comments = null;

  #commentsBlockView = null;

  constructor(film, container,popupContainer, commentsModel) {
    this.#film = film;
    this.#container = container;
    this.#popupContainer = popupContainer;
    this.#commentsModel = commentsModel;
    this.#comments = [...this.#commentsModel.comments];
  }

  init = () => {
    this.#filmComponent = new FilmView(this.#film);
    render(this.#filmComponent, this.#container);
    this.#filmComponent.setClickHandler(this.#openPopup);
  };

  #closePopup = () => {
    this.#filmPopupComponent.removeClickHandler();
    remove(this.#filmPopupComponent);
    document.body.classList.toggle('hide-overflow');
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#closePopup();
      document.removeEventListener('keydown', this.#onEscKeyDown);
      this.#filmPopupComponent = null;
    }
  };

  #openPopup = () => {
    this.#sortedComments = this.#film.comments.map((item) => this.#comments.find((filmItem) => filmItem.id === item));
    if (this.#filmPopupComponent) {
      if (this.#film.id === this.#filmPopupComponent.id) {
        return;
      }
      this.#closePopup();
    }
    this.#filmPopupComponent = new FilmPopupView(this.#film);
    render(this.#filmPopupComponent, this.#popupContainer);
    this.#commentsBlockView = new CommentsBlockView(this.#sortedComments.length);
    render(this.#commentsBlockView, this.#filmPopupComponent.element.querySelector('.film-details__bottom-container'));
    for (const comment of this.#sortedComments) {
      render(new CommentView(comment), this.#commentsBlockView.element);
    }
    render(new CommentFormView(), this.#commentsBlockView.element);
    this.#filmPopupComponent.setClickHandler(this.#closePopup);
    document.body.classList.toggle('hide-overflow');
    document.addEventListener('keydown', this.#onEscKeyDown);
  };
}

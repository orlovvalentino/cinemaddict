import FilmPopupView from '../view/film-popup-view';
import {remove, render} from '../framework/render';
import CommentsBlockView from '../view/comments-block-view';
import CommentView from '../view/comment-view';
import CommentFormView from '../view/comment-form-view';

export default class FilmPopupPresenter {
  #film = null;
  #container = null;
  #filmPopupComponent = null;

  #sortedComments = [];
  #commentsModel = null;
  #comments = null;
  #commentsBlockView = null;

  constructor(container,commentsModel) {
    this.#container = container;
    this.#commentsModel = commentsModel;
    this.#comments = [...this.#commentsModel.comments];
  }

  closePopup = () => {
    this.#filmPopupComponent.removeClickHandler();
    remove(this.#filmPopupComponent);
    document.body.classList.toggle('hide-overflow');
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  open = (film, ) => {
    this.#film = film;

    if (this.#filmPopupComponent) {
      if (this.#film.id === this.#filmPopupComponent.id) {
        return;
      }
      this.closePopup();
    }
    this.#filmPopupComponent = new FilmPopupView(this.#film);
    render(this.#filmPopupComponent, this.#container);

    this.#filmPopupComponent.setClickHandler(this.closePopup);
    document.body.classList.toggle('hide-overflow');
    document.addEventListener('keydown', this.#onEscKeyDown);
    this.#addBlockReview();
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.closePopup();
      document.removeEventListener('keydown', this.#onEscKeyDown);
      this.#filmPopupComponent = null;
    }
  };

  #addBlockReview = () => {
    this.#sortedComments = this.#film.comments.map((item) => this.#comments.find((filmItem) => filmItem.id === item));
    this.#commentsBlockView = new CommentsBlockView(this.#sortedComments.length);
    render(this.#commentsBlockView, this.#filmPopupComponent.element.querySelector('.film-details__bottom-container'));
    for (const comment of this.#sortedComments) {
      render(new CommentView(comment), this.#commentsBlockView.element);
    }
    render(new CommentFormView(), this.#commentsBlockView.element);
  };
}

import FilmPopupView from '../view/film-popup-view';
import {remove, render, replace} from '../framework/render';
import CommentsBlockView from '../view/comments-block-view';
import CommentView from '../view/comment-view';
import CommentFormView from '../view/comment-form-view';
import FilmPopupControlsView from '../view/film-popup-controls-view';

export default class FilmPopupPresenter {
  #film = null;
  #container = null;
  #filmPopupComponent = null;

  #sortedComments = [];
  #commentsModel = null;
  #comments = null;
  #commentsBlockView = null;
  #filmPopupControlsView = null;
  #updateUserDetails = () => true;

  constructor(container, commentsModel) {
    this.#container = container;
    this.#commentsModel = commentsModel;
    this.#comments = [...this.#commentsModel.comments];
  }

  #closePopup = () => {
    this.#filmPopupComponent.removeClickHandler();
    remove(this.#filmPopupComponent);
    document.body.classList.toggle('hide-overflow');
    document.removeEventListener('keydown', this.#onEscKeyDown);
    this.setPopupCurrentFilmId(null);
  };

  open = (film,  updateUserDetails, getPopupCurrentFilmId, setPopupCurrentFilmId) => {
    this.#film = film;
    this.getPopupCurrentFilmId = getPopupCurrentFilmId;
    this.setPopupCurrentFilmId = setPopupCurrentFilmId;
    this.#updateUserDetails = updateUserDetails;

    if (this.#filmPopupComponent) {
      if (this.#film.id === this.getPopupCurrentFilmId) {
        return;
      }
      this.#closePopup();
    }
    this.#filmPopupComponent = new FilmPopupView(this.#film);
    this.setPopupCurrentFilmId(this.#film.id);
    render(this.#filmPopupComponent, this.#container);

    this.#filmPopupComponent.setClickHandler(this.#closePopup);
    document.body.classList.toggle('hide-overflow');
    document.addEventListener('keydown', this.#onEscKeyDown);
    this.#addBlockReview();
    this.#addControls();
    this.#setHandlersOnControls();
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#closePopup();
      document.removeEventListener('keydown', this.#onEscKeyDown);
      this.#filmPopupComponent = null;
    }
  };

  #addControls = () => {
    this.#filmPopupControlsView = new FilmPopupControlsView(this.#film);
    render(this.#filmPopupControlsView, this.#filmPopupComponent.element.querySelector('.film-details__top-container'));
  };

  #setHandlersOnControls = () => {
    this.#filmPopupControlsView.setWatchlistClickHandler(this.#updateControlsData);
    this.#filmPopupControlsView.setWatchedClickHandler(this.#updateControlsData);
    this.#filmPopupControlsView.setFavoriteClickHandler(this.#updateControlsData);
  };

  #updateControlsData = (film, key) => {
    this.#updateUserDetails(film, key);
    this.updateControls();
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

  updateControls = () => {
    const filmPopupControlsViewNew = new FilmPopupControlsView(this.#film);
    replace(filmPopupControlsViewNew, this.#filmPopupControlsView);
    this.#filmPopupControlsView = filmPopupControlsViewNew;
    this.#setHandlersOnControls();
  };
}

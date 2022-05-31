import FilmPopupView from '../view/popup/film-popup-view';
import { remove, render, replace } from '../framework/render';
import CommentView from '../view/popup/comment-view';
import CommentFormView from '../view/popup/comment-form-view';
import FilmPopupControlsView from '../view/popup/film-popup-controls-view';

export default class FilmPopupPresenter {
  #film = null;
  #container = null;
  #filmPopupComponent = null;

  #sortedComments = [];
  #commentsModel = null;
  #comments = null;
  #filmPopupControlsView = null;
  #commentFormView = null;
  #updateUserDetails = () => true;

  constructor(container, commentsModel) {
    this.#container = container;
    this.#commentsModel = commentsModel;
  }

  get comments() {
    return this.#commentsModel.comments;
  }

  #closePopup = () => {
    this.#filmPopupComponent.removeClickHandler();
    remove(this.#filmPopupComponent);
    document.body.classList.toggle('hide-overflow');
    document.removeEventListener('keydown', this.#onEscKeyDown);
    this.setPopupCurrentFilmId(null);
  };

  open = (
    film,
    updateUserDetails,
    getPopupCurrentFilmId,
    setPopupCurrentFilmId
  ) => {
    this.#film = film;
    this.#sortedComments = this.#film.comments.map((item) =>
      this.comments.find((filmItem) => filmItem.id === item)
    );
    this.getPopupCurrentFilmId = getPopupCurrentFilmId;
    this.setPopupCurrentFilmId = setPopupCurrentFilmId;
    this.#updateUserDetails = updateUserDetails;

    if (this.#filmPopupComponent) {
      if (this.#film.id === this.getPopupCurrentFilmId) {
        return;
      }
      this.#closePopup();
    }
    this.#filmPopupComponent = new FilmPopupView(
      this.#film,
      this.#sortedComments
    );
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
    render(
      this.#filmPopupControlsView,
      this.#filmPopupComponent.element.querySelector(
        '.film-details__top-container'
      )
    );
  };

  #setHandlersOnControls = () => {
    this.#filmPopupControlsView.setWatchlistClickHandler(
      this.#updateControlsData
    );
    this.#filmPopupControlsView.setWatchedClickHandler(
      this.#updateControlsData
    );
    this.#filmPopupControlsView.setFavoriteClickHandler(
      this.#updateControlsData
    );
  };

  #updateControlsData = (film, key) => {
    this.#updateUserDetails(film, key);
    this.updateControls();
  };

  #addBlockReview = () => {
    this.#sortedComments = this.#film.comments.map((item) =>
      this.comments.find((filmItem) => filmItem.id === item)
    );
    if (this.#sortedComments.length > 0) {
      for (const comment of this.#sortedComments) {
        render(
          new CommentView(comment),
          this.#filmPopupComponent.element.querySelector(
            '.film-details__comments-list'
          )
        );
      }
    }
    this.#commentFormView = new CommentFormView();
    render(
      this.#commentFormView,
      this.#filmPopupComponent.element.querySelector(
        '.film-details__comments-wrap'
      )
    );
    this.#commentFormView.setEmojiChangeHandler();
  };

  updateControls = () => {
    const filmPopupControlsViewNew = new FilmPopupControlsView(this.#film);
    replace(filmPopupControlsViewNew, this.#filmPopupControlsView);
    this.#filmPopupControlsView = filmPopupControlsViewNew;
    this.#setHandlersOnControls();
  };
}

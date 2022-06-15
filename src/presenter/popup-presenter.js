import FilmPopupView from '../view/popup/film-popup-view';
import { remove, render, replace } from '../framework/render';
import { filmsModel } from '../model/films-model.js';
import CommentsModel from '../model/comments-model.js';
import CommentView from '../view/popup/comment-view';
import CommentFormView from '../view/popup/comment-form-view';
import FilmPopupControlsView from '../view/popup/film-popup-controls-view';
import {UpdateType} from '../const';

export default class FilmPopupPresenter {
  #film = null;
  #container = null;
  #filmPopupComponent = null;
  #filmsModel = null;

  #sortedComments = [];
  #commentsModel = null;
  #comments = null;
  #commentsView = new Map();
  #filmPopupControlsView = null;
  #commentFormView = null;
  #updateUserDetails = () => true;


  constructor(container) {
    this.#filmsModel = filmsModel;
    this.#container = container;
    this.#commentsModel = new CommentsModel();
    this.#commentsModel.addObserver(this.#handleModelEvent);
  }

  get comments() {
    return this.#commentsModel.comments;
  }

  #handleModelEvent = () => {
    this.#cleanBlockReview();
    this.#addBlockReview();
  };

  #closePopup = () => {
    this.#filmPopupComponent.removeClickHandler();
    remove(this.#filmPopupComponent);
    document.body.classList.toggle('hide-overflow');
    document.removeEventListener('keydown', this.#onEscKeyDown);
    this.setPopupCurrentFilmId(null);
  };

  #getSortedComments = ()=> this.#film.comments.map((item) => this.comments.find((filmItem) => filmItem.id === item)).filter((x)=> x !== undefined);

  open = (
    film,
    updateUserDetails,
    getPopupCurrentFilmId,
    setPopupCurrentFilmId
  ) => {
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
    this.#filmPopupComponent = new FilmPopupView(
      this.#film,
      this.#getSortedComments()
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
    const commentView = new CommentView(this.#getSortedComments());
    commentView.setDeleteClickHandler(this.#updateCommentsData);
    render(commentView, this.#filmPopupComponent.element.querySelector('.film-details__bottom-container'));
    this.#commentFormView = new CommentFormView();
    render(this.#commentFormView, commentView.element);
    this.#commentFormView.setEmojiChangeHandler();
  };

  #cleanBlockReview = ()=>{
    this.#filmPopupComponent.element.querySelector('.film-details__bottom-container').innerHTML = '';
  };

  #updateCommentsData = (id)=>{
    const commentIndex = this.#film.comments.findIndex((item)=> item === Number(id));
    this.#film.comments = [
      ...this.#film.comments.slice(0, commentIndex),
      ...this.#film.comments.slice(commentIndex + 1),
    ];

    this.#commentsModel.deleteComment(UpdateType.MAJOR,id);
    this.#filmsModel.updateFilm(UpdateType.MAJOR, this.#film);
  };

  updateControls = () => {
    const filmPopupControlsViewNew = new FilmPopupControlsView(this.#film);
    replace(filmPopupControlsViewNew, this.#filmPopupControlsView);
    this.#filmPopupControlsView = filmPopupControlsViewNew;
    this.#setHandlersOnControls();
  };
}

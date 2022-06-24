import FilmPopupView from '../view/popup/film-popup-view';
import {remove, render, replace} from '../framework/render';
import CommentView from '../view/popup/comment-view';
import CommentFormView from '../view/popup/comment-form-view';
import FilmPopupControlsView from '../view/popup/film-popup-controls-view';
import FilmsApiService from '../films-api-service';
import {UpdateType} from '../const';

const AUTHORIZATION = 'Basic qawsedrftgyhujxd55';
const END_POINT = 'https://17.ecmascript.pages.academy/cinemaddict';

export default class FilmPopupPresenter {
  #sendComment = new FilmsApiService(END_POINT, AUTHORIZATION);
  #film = null;
  #container = null;
  #filmPopupComponent = null;
  #filmsModel = null;
  #commentsModel = null;
  #filmPopupControlsView = null;
  #commentFormView = null;
  #updateUserDetails = () => true;

  constructor(container,commentsModel,filmsModel) {
    this.#container = container;
    this.#commentsModel = commentsModel;
    this.#filmsModel = filmsModel;
    this._state = {};
  }

  get comments() {
    return this.#commentsModel.comments;
  }

  open = (
    film,
    updateUserDetails,
    getPopupCurrentFilmId,
    setPopupCurrentFilmId
  ) => {
    this.#commentsModel.addObserver(this.#handleModelEvent);
    this.#filmsModel.addObserver(this.#handleModelEvent);
    this.#film = film;
    this.getPopupCurrentFilmId = getPopupCurrentFilmId;
    this.setPopupCurrentFilmId = setPopupCurrentFilmId;
    this.#commentsModel.init(this.#film.id);
    this.#updateUserDetails = updateUserDetails;

    if (this.#filmPopupComponent) {
      if (this.#film.id === this.getPopupCurrentFilmId) {
        return;
      }
      this.#closePopup();
    }
    this.#filmPopupComponent = new FilmPopupView(
      this.#film,
      this.comments
    );
    this.setPopupCurrentFilmId(this.#film.id);
    render(this.#filmPopupComponent, this.#container);

    this.#filmPopupComponent.setClickHandler(this.#closePopup);
    this.#filmPopupComponent.setSubmitHandler(this.#formReviewSubmit);
    document.body.classList.toggle('hide-overflow');
    document.addEventListener('keydown', this.#onEscKeyDown);
    this.#addBlockReview();
    this.#addControls();
    this.#setHandlersOnControls();
  };

  updateControls = () => {
    const filmPopupControlsViewNew = new FilmPopupControlsView(this.#film);
    replace(filmPopupControlsViewNew, this.#filmPopupControlsView);
    this.#filmPopupControlsView = filmPopupControlsViewNew;
    this.#setHandlersOnControls();
  };

  #handleModelEvent = () => {
    this.#cleanBlockReview();
    this.#addBlockReview();
  };

  #closePopup = () => {
    this.#filmPopupComponent.removeClickHandler();
    this.#filmPopupComponent.removeSubmitHandler();
    remove(this.#filmPopupComponent);
    document.body.classList.toggle('hide-overflow');
    document.removeEventListener('keydown', this.#onEscKeyDown);
    this.setPopupCurrentFilmId(null);
  };

  #formReviewSubmit = () => {
    const data = {};
    const formData = new FormData(document.querySelector('.film-details__inner'));
    formData.forEach((value, key) => {
      data[key] = value;
    });
    this.#filmPopupComponent.showLoader();
    this.#sendComment.addComment(data, this.#film.id)
      .then((resp)=>{
        this.#commentsModel.updateComments(UpdateType.MAJOR, resp.comments);
        this.#filmsModel.updateCommentFilm(UpdateType.MAJOR, resp.movie);
      })
      .finally(()=>{
        this.#filmPopupComponent.hideLoader();
      });
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
    const commentView = new CommentView(this.comments);
    commentView.setDeleteClickHandler(this.#deleteCommentsData);
    render(commentView, this.#filmPopupComponent.element.querySelector('.film-details__bottom-container'));
    this.#commentFormView = new CommentFormView(this._state);
    render(this.#commentFormView, commentView.element);
    this.#commentFormView.setEmojiChangeHandler();
    this.#commentFormView.setInputChangeHandler();
  };

  #cleanBlockReview = () => {
    this.#filmPopupComponent.element.querySelector('.film-details__bottom-container').innerHTML = '<div class="lds-dual-ring"></div>';
  };

  #deleteCommentsData = (id) => {
    const commentIndex = this.#film.comments.findIndex((item) => item === Number(id));
    this.#filmPopupComponent.showLoader();
    this.#sendComment.deleteComment(id)
      .then(()=>{
        const comments = [...this.#film.comments];
        this.#film.comments = [
          ...comments.slice(0, commentIndex),
          ...comments.slice(commentIndex + 1),
        ];

        this.#commentsModel.deleteComment(UpdateType.MAJOR, id);
        this.#filmsModel.updateFilm(UpdateType.MAJOR, this.#film);
      })
      .finally(()=>{
        this.#filmPopupComponent.hideLoader();
      });
  };
}

import ContentView from '../view/content-view.js';
import FilmsListView from '../view/films-list-view';
import FilmsListContainerView from '../view/films-list-container-view';
import FilmsListExtraView from '../view/films-list-extra-view';
import FilmView from '../view/film-view';
import ShowMoreButtonView from '../view/show-more-button-view';

import {render} from '../render';
import FilmPopupView from '../view/film-popup-view';
import CommentsBlockView from '../view/comments-block-view';
import CommentView from '../view/comment-view';
import CommentFormView from '../view/comment-form-view';

export default class ContentPresenter {
  #contentComponent = new ContentView();
  #mainFilmsList = new FilmsListView();
  #mainFilmsListContainer = new FilmsListContainerView();

  #topRatedFilmsList = new FilmsListExtraView('Top rated');
  #topRatedFilmsListContainer = new FilmsListContainerView();

  #mostCommentedFilmsList = new FilmsListExtraView('Most commented');
  #mostCommentedFilmsListContainer = new FilmsListContainerView();

  #contentContainer = null;
  #popupContainer = null;
  #filmsModel = null;
  #mainFilms = null;
  #relatedFilms = null;
  #commentedFilms = null;

  #commentsModel = null;
  #comments = null;
  #commentsBlockView = null;

  init = (contentContainer, filmsModel, popupContainer, commentsModel) => {
    this.#contentContainer = contentContainer;
    this.#popupContainer = popupContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#comments = [...this.#commentsModel.comments];
    this.#mainFilms = [...this.#filmsModel.films];
    this.#relatedFilms = [...this.#filmsModel.films].slice(0, 2);
    this.#commentedFilms = [...this.#filmsModel.films].slice(0, 2);

    render(this.#contentComponent, this.#contentContainer);
    render(this.#mainFilmsList, this.#contentComponent.element);
    render(this.#mainFilmsListContainer, this.#mainFilmsList.element);
    render(new ShowMoreButtonView, this.#mainFilmsList.element);

    for (const film of this.#mainFilms) {
      this.#renderFilm(film, this.#mainFilmsListContainer.element);
    }

    render(this.#topRatedFilmsList, this.#contentComponent.element);
    render(this.#topRatedFilmsListContainer, this.#topRatedFilmsList.element);
    for (const film of this.#relatedFilms) {
      this.#renderFilm(film, this.#topRatedFilmsListContainer.element);
    }

    render(this.#mostCommentedFilmsList, this.#contentComponent.element);
    render(this.#mostCommentedFilmsListContainer, this.#mostCommentedFilmsList.element);
    for (const film of this.#commentedFilms) {
      this.#renderFilm(film, this.#mostCommentedFilmsListContainer.element);
    }
  };

  #renderFilm = (film, place) => {
    const filmComponent = new FilmView(film);
    let filmPopupComponent = null;

    const closePopup = () => {
      filmPopupComponent.element.querySelector('.film-details__close-btn').removeEventListener('click', filmPopupComponent.element);
      filmPopupComponent.removeElement();
      document.body.classList.toggle('hide-overflow');
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        closePopup(filmPopupComponent);
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    const openPopup = () => {
      filmPopupComponent = new FilmPopupView(film);
      render(filmPopupComponent, this.#popupContainer);
      this.#commentsBlockView = new CommentsBlockView(this.#comments.length);
      render(this.#commentsBlockView, filmPopupComponent.element.querySelector('.film-details__bottom-container'));
      for (const comment of this.#comments) {
        render(new CommentView(comment), this.#commentsBlockView.element);
      }
      render(new CommentFormView(), this.#commentsBlockView.element);
      filmPopupComponent.element.querySelector('.film-details__close-btn').addEventListener('click', () => {
        closePopup(filmPopupComponent);
      });
      document.body.classList.toggle('hide-overflow');
      document.addEventListener('keydown', onEscKeyDown);
    };

    filmComponent.element.querySelector('.film-card__link').addEventListener('click', () => {
      openPopup();
    });


    render(filmComponent, place);
  };
}

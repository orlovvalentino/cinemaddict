import ContentView from '../view/content-view.js';
import FilmsListView from '../view/films-list-view';
import FilmsListContainerView from '../view/films-list-container-view';
import FilmsListExtraView from '../view/films-list-extra-view';

import {render, RenderPosition} from '../framework/render.js';
import FilmsListEmptyView from '../view/films-list-empty';
import SorterView from '../view/sorter-view';

import FilmPresenter from './film-presenter.js';
import ShowMoreButtonPresenter from './show-more-button-presenter';
import FilmPopupPresenter from './popup-presenter';

const FILMS_COUNT_PER_STEP = 5;


export default class ContentPresenter {
  #contentComponent = new ContentView();
  #sorterView = new SorterView();
  #mainFilmsList = new FilmsListView();
  #mainFilmsListContainer = new FilmsListContainerView();
  #filmsListEmpty = new FilmsListEmptyView();

  #topRatedFilmsList = new FilmsListExtraView('Top rated');
  #topRatedFilmsListContainer = new FilmsListContainerView();

  #mostCommentedFilmsList = new FilmsListExtraView('Most commented');
  #mostCommentedFilmsListContainer = new FilmsListContainerView();
  #showMoreButtonPresenter = null;

  #contentContainer = null;
  #popupContainer = null;
  #popupCurrentFilmId = null;
  #popupPresenter = null;
  #filmsModel = null;
  #mainFilms = null;
  #relatedFilms = null;
  #commentedFilms = null;
  #commentsModel = null;
  #renderedFilmsCount = FILMS_COUNT_PER_STEP;

  init = (contentContainer, filmsModel, popupContainer, commentsModel) => {
    this.#contentContainer = contentContainer;
    this.#popupContainer = popupContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#mainFilms = [...this.#filmsModel.films];
    this.#relatedFilms = [...this.#filmsModel.films].slice(0, 2);
    this.#commentedFilms = [...this.#filmsModel.films].slice(0, 2);

    render(this.#contentComponent, this.#contentContainer);
    if (this.#mainFilms.length > 0) {
      render(this.#mainFilmsList, this.#contentComponent.element);
      render(this.#topRatedFilmsList, this.#contentComponent.element);
      render(this.#topRatedFilmsListContainer, this.#topRatedFilmsList.element);
      render(this.#sorterView, this.#contentComponent.element, RenderPosition.BEFOREBEGIN);
      for (const film of this.#relatedFilms) {
        this.#renderFilm(film, this.#topRatedFilmsListContainer.element);
      }

      render(this.#mostCommentedFilmsList, this.#contentComponent.element);
      render(this.#mostCommentedFilmsListContainer, this.#mostCommentedFilmsList.element);
      for (const film of this.#commentedFilms) {
        this.#renderFilm(film, this.#mostCommentedFilmsListContainer.element);
      }
    } else {
      render(this.#filmsListEmpty, this.#contentComponent.element);
    }

    render(this.#mainFilmsListContainer, this.#mainFilmsList.element);

    this.#showMoreButton(this.#mainFilms.length > this.#renderedFilmsCount);

    for (let i = 0; i < Math.min(this.#mainFilms.length, this.#renderedFilmsCount); i++) {
      this.#renderFilm(this.#mainFilms[i], this.#mainFilmsListContainer.element);
    }
    this.#popupPresenter = new FilmPopupPresenter(this.#popupContainer, this.#commentsModel);
  };

  #showMoreFilms = () => {
    this.#mainFilms.slice(this.#renderedFilmsCount, this.#renderedFilmsCount + FILMS_COUNT_PER_STEP)
      .forEach((film) => this.#renderFilm(film, this.#mainFilmsListContainer.element));
    this.#renderedFilmsCount += FILMS_COUNT_PER_STEP;
    if (this.#renderedFilmsCount >= this.#mainFilms.length) {
      this.#showMoreButtonPresenter.destroy();
      this.#showMoreButtonPresenter = null;
    }
  };

  #showMoreButton = (letsShowButton) => {
    if (!letsShowButton) {
      return;
    }
    this.#showMoreButtonPresenter = new ShowMoreButtonPresenter(this.#mainFilmsList.element);
    this.#showMoreButtonPresenter.init(this.#showMoreFilms);
  };

  #renderFilm = (film, container) => {
    const filmPresenter = new FilmPresenter(film, container, this.#popupContainer, this.#commentsModel, this.popupCurrentFilmId);
    filmPresenter.init();
    filmPresenter.setClickHandler(this.#openPopup);
  };

  #openPopup = (film) => {
    this.#popupPresenter.open(film, this.popupCurrentFilmId,this.#setPopupCurrentFilmId);
  };

  get popupCurrentFilmId() {
    return this.#popupCurrentFilmId;
  }

  set popupCurrentFilmId(newId) {
    this.#popupCurrentFilmId = newId;
  }

  #setPopupCurrentFilmId = (newId) => {
    this.popupCurrentFilmId = newId;
  };
}

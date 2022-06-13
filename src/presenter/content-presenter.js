import ContentView from '../view/content-view.js';
import FilmsListView from '../view/films-list-view';
import FilmsListContainerView from '../view/films-list-container-view';
import FilmsListExtraView from '../view/films-list-extra-view';

import {remove, render, RenderPosition, replace} from '../framework/render.js';
import FilmsListEmptyView from '../view/films-list-empty';
import SorterView from '../view/sorter-view';
import {FilterType, SortType, UpdateType} from '../const';

import FilmPresenter from './film-presenter.js';
import ShowMoreButtonPresenter from './show-more-button-presenter';
import FilmPopupPresenter from './popup-presenter';

const FILMS_COUNT_PER_STEP = 5;

export default class ContentPresenter {
  #contentComponent = new ContentView();

  #currentSort = SortType.DEFAULT;

  #sorterView = null;
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
  #mainFilmsBackup = null;
  #relatedFilms = null;
  #commentedFilms = null;
  #commentsModel = null;
  #filterModel = null;
  #renderedFilmsCount = FILMS_COUNT_PER_STEP;

  #FilmsPresenter = {
    mainFilmsPresenter: new Map(),
    relatedFilmsPresenter: new Map(),
    commentedFilmsPresenter: new Map(),
  };

  constructor(contentContainer, filmsModel, popupContainer, commentsModel, filterModel) {
    this.#contentContainer = contentContainer;
    this.#popupContainer = popupContainer;
    this.#filmsModel = filmsModel;
    this.#mainFilmsBackup = [...filmsModel.films];
    this.#commentsModel = commentsModel;
    this.#filterModel = filterModel;
  }

  get mainFilms() {
    const filteredFilms = this.#filteredFilms();

    switch (this.#currentSort) {
      case SortType.DATE:
        return filteredFilms.sort(this.#sortFilmsByDate);
      case SortType.RATING:
        return filteredFilms.sort(this.#sortFilmsByRating);
    }
    return filteredFilms;
  }

  set mainFilms(films) {
    this.#filmsModel.films = [...films];
  }

  init = () => {
    render(this.#contentComponent, this.#contentContainer);

    this.#renderMainBoard();

    this.#renderTopRelatedFilms();
    this.#renderMostCommentedFilms();

    this.#popupPresenter = new FilmPopupPresenter(this.#popupContainer, this.#commentsModel);

    this.#filmsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelFilterEvent);
  };

  #renderMainBoard = () => {
    const prevSorterView = this.#sorterView;
    if (this.mainFilms.length > 0) {
      this.#sorterView = new SorterView(this.#currentSort);
      this.#sorterView.setClickHandler(this.#sortFilms);
      if(prevSorterView === null){
        render(this.#sorterView, this.#contentComponent.element, RenderPosition.BEFOREBEGIN);
      }else{
        replace(this.#sorterView, prevSorterView);
        remove(prevSorterView);
      }

      render(this.#mainFilmsList, this.#contentComponent.element,RenderPosition.AFTERBEGIN);
    } else {
      if(this.#mainFilmsList){
        replace(this.#filmsListEmpty,this.#mainFilmsList);
        return;
      }
      render(this.#filmsListEmpty, this.#contentComponent.element);
    }

    render(this.#mainFilmsListContainer, this.#mainFilmsList.element);
    this.#renderMainFilmsList();

    if(this.#showMoreButtonPresenter !== null){
      this.#showMoreButtonPresenter.destroy();
      this.#showMoreButtonPresenter = null;
    }
    this.#showMoreButton(this.mainFilms.length > this.#renderedFilmsCount);
  };

  #handleModelEvent = () => {
    this.#clearMainFilmsList();
    this.#renderMainBoard();
  };

  #handleModelFilterEvent = () => {
    this.#currentSort = SortType.DEFAULT;
    this.#renderedFilmsCount = FILMS_COUNT_PER_STEP;
    this.#clearMainFilmsList();
    this.#renderMainBoard();
  };

  #renderAdditionalFilms = (additionalView, additionalViewContainer, films, presenters) => {
    render(additionalView, this.#contentComponent.element);
    render(additionalViewContainer, additionalView.element);
    for (const film of films) {
      this.#renderFilm(film, additionalViewContainer.element, presenters);
    }
  };

  #renderTopRelatedFilms = () => {
    this.#relatedFilms = [...this.#filmsModel.films].slice(0, 2);
    this.#renderAdditionalFilms(
      this.#topRatedFilmsList,
      this.#topRatedFilmsListContainer,
      this.#relatedFilms,
      this.#FilmsPresenter.relatedFilmsPresenter
    );
  };

  #renderMostCommentedFilms = () => {
    this.#commentedFilms = [...this.#filmsModel.films].slice(0, 2);
    this.#renderAdditionalFilms(
      this.#mostCommentedFilmsList,
      this.#mostCommentedFilmsListContainer,
      this.#commentedFilms,
      this.#FilmsPresenter.commentedFilmsPresenter
    );
  };

  #showMoreFilms = () => {
    this.mainFilms
      .slice(
        this.#renderedFilmsCount,
        this.#renderedFilmsCount + FILMS_COUNT_PER_STEP
      )
      .forEach((film) =>
        this.#renderFilm(
          film,
          this.#mainFilmsListContainer.element,
          this.#FilmsPresenter.mainFilmsPresenter
        )
      );
    this.#renderedFilmsCount += FILMS_COUNT_PER_STEP;
    if (this.#renderedFilmsCount >= this.mainFilms.length) {
      this.#showMoreButtonPresenter.destroy();
      this.#showMoreButtonPresenter = null;
    }
  };

  #showMoreButton = (letsShowButton) => {
    if (!letsShowButton) {
      return;
    }
    this.#showMoreButtonPresenter = new ShowMoreButtonPresenter(
      this.#mainFilmsList.element
    );
    this.#showMoreButtonPresenter.init(this.#showMoreFilms);
  };

  #renderFilm = (film, container, mapRendered) => {
    const filmPresenter = new FilmPresenter(
      film,
      container,
      this.#popupContainer,
      this.#commentsModel,
      this.#updateUserDetails
    );
    mapRendered.set(film.id, filmPresenter);
    filmPresenter.init();
    filmPresenter.setLinkClickHandler(this.#openPopup);
  };

  #updateUserDetails = (film, key) => {
    film.userDetails[key] = !film.userDetails[key];
    this.#filmsModel.updateFilm(UpdateType.MAJOR, film);
    for (const item in this.#FilmsPresenter) {
      const presenter = this.#FilmsPresenter[item];
      if (presenter.get(film.id)) {
        presenter.get(film.id).updateControls(film);
      }
    }
    if (this.popupCurrentFilmId) {
      this.#popupPresenter.updateControls();
    }
  };

  #openPopup = (film) => {
    this.#popupPresenter.open(
      film,
      this.#updateUserDetails,
      this.popupCurrentFilmId,
      this._setPopupCurrentFilmId
    );
  };

  get popupCurrentFilmId() {
    return this.#popupCurrentFilmId;
  }

  set popupCurrentFilmId(newId) {
    this.#popupCurrentFilmId = newId;
  }

  _setPopupCurrentFilmId = (newId) => {
    this.popupCurrentFilmId = newId;
  };

  #filteredFilms = () => {
    switch (this.#filterModel.currentFilter) {
      case FilterType.ALL:
        return this.#filmsModel.films;
      case FilterType.WATCHLIST:
        return this.#filmsModel.films.filter((i) => i.userDetails.watchlist);
      case FilterType.WATCHED:
        return this.#filmsModel.films.filter((i) => i.userDetails.alreadyWatched);
      case FilterType.FAVORITE:
        return this.#filmsModel.films .filter((i) => i.userDetails.favorite);
    }
  };

  #sortFilms = (sort) => {
    if (sort === this.#currentSort) {
      return true;
    }
    this.#currentSort = sort;
    this.#clearMainFilmsList();
    this.#renderMainBoard();
  };

  #clearMainFilmsList = () => {
    this.#FilmsPresenter.mainFilmsPresenter.forEach((presenter) =>
      presenter.destroy()
    );
    this.#FilmsPresenter.mainFilmsPresenter.clear();
    this.#mainFilmsListContainer.element.innerHTML = '';
  };

  #renderMainFilmsList = () => {
    for (let i = 0; i < Math.min(this.mainFilms.length, this.#renderedFilmsCount); i++) {
      this.#renderFilm(
        this.mainFilms[i],
        this.#mainFilmsListContainer.element,
        this.#FilmsPresenter.mainFilmsPresenter
      );
    }
  };

  #sortFilmsByDate = (a,b) => new Date(a.filmInfo.release.date).getTime() - new Date(b.filmInfo.release.date).getTime();
  #sortFilmsByRating = (a,b) => a.filmInfo.totalRating - b.filmInfo.totalRating;
}

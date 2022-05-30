import ContentView from "../view/content-view.js";
import FilmsListView from "../view/films-list-view";
import FilmsListContainerView from "../view/films-list-container-view";
import FilmsListExtraView from "../view/films-list-extra-view";

import { render, RenderPosition } from "../framework/render.js";
import FilmsListEmptyView from "../view/films-list-empty";
import SorterView from "../view/sorter-view";
import { SortType } from "../const";

import FilmPresenter from "./film-presenter.js";
import ShowMoreButtonPresenter from "./show-more-button-presenter";
import FilmPopupPresenter from "./popup-presenter";

const FILMS_COUNT_PER_STEP = 5;
const SORT_DEFAULT = "default";

export default class ContentPresenter {
  #contentComponent = new ContentView();
  #currentSort = SORT_DEFAULT;
  #sorterView = null;
  #mainFilmsList = new FilmsListView();
  #mainFilmsListContainer = new FilmsListContainerView();
  #filmsListEmpty = new FilmsListEmptyView();

  #topRatedFilmsList = new FilmsListExtraView("Top rated");
  #topRatedFilmsListContainer = new FilmsListContainerView();

  #mostCommentedFilmsList = new FilmsListExtraView("Most commented");
  #mostCommentedFilmsListContainer = new FilmsListContainerView();
  #showMoreButtonPresenter = null;

  #contentContainer = null;
  #popupContainer = null;
  #popupCurrentFilmId = null;
  #popupPresenter = null;
  #filmsModel = null;
  #relatedFilms = null;
  #commentedFilms = null;
  #commentsModel = null;
  #renderedFilmsCount = FILMS_COUNT_PER_STEP;

  #FilmsPresenter = {
    mainFilmsPresenter: new Map(),
    relatedFilmsPresenter: new Map(),
    commentedFilmsPresenter: new Map(),
  };
  get mainFilms() {
    return this.#filmsModel.films;
  }

  init = (contentContainer, filmsModel, popupContainer, commentsModel) => {
    this.#contentContainer = contentContainer;
    this.#popupContainer = popupContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;

    render(this.#contentComponent, this.#contentContainer);

    if (this.mainFilms.length > 0) {
      this.#sorterView = new SorterView(this.#currentSort);
      render(
        this.#sorterView,
        this.#contentComponent.element,
        RenderPosition.BEFOREBEGIN
      );
      this.#sorterView.setClickHandler(this.#sortFilms);

      render(this.#mainFilmsList, this.#contentComponent.element);

      this.#renderTopRelatedFilms();
      this.#renderMostCommentedFilms();
    } else {
      render(this.#filmsListEmpty, this.#contentComponent.element);
    }

    render(this.#mainFilmsListContainer, this.#mainFilmsList.element);
    this.#showMoreButton(this.mainFilms.length > this.#renderedFilmsCount);
    this.#renderMainFilmsList();
    this.#popupPresenter = new FilmPopupPresenter(
      this.#popupContainer,
      this.#commentsModel
    );
  };

  #renderAdditionalFilms = (
    additionalView,
    additionalViewContainer,
    films,
    presenters
  ) => {
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

  #sortFilms = (sort) => {
    if (sort === this.#currentSort) {
      return true;
    }
    switch (sort) {
      case SortType.DEFAULT:
        this.#currentSort = SortType.DEFAULT;
        return this.#sortFilmsByDefault();
      case SortType.DATE:
        this.#currentSort = SortType.DATE;
        return this.#sortFilmsByDate();
      case SortType.RATING:
        this.#currentSort = SortType.RATING;
        return this.#sortFilmsByRating();
    }
  };

  #clearMainFilmsList = () => {
    this.#FilmsPresenter.mainFilmsPresenter.forEach((presenter) =>
      presenter.destroy()
    );
    this.#FilmsPresenter.mainFilmsPresenter.clear();
    this.#mainFilmsListContainer.element.innerHTML = "";
  };

  #renderMainFilmsList = () => {
    for (
      let i = 0;
      i < Math.min(this.mainFilms.length, this.#renderedFilmsCount);
      i++
    ) {
      this.#renderFilm(
        this.mainFilms[i],
        this.#mainFilmsListContainer.element,
        this.#FilmsPresenter.mainFilmsPresenter
      );
    }
  };

  #sortFilmsByDefault = () => {
    this.mainFilms = [...this.#filmsModel.films];
    this.#clearMainFilmsList();
    this.#renderMainFilmsList();
  };

  #sortFilmsByDate = () => {
    this.mainFilms = [...this.#filmsModel.films].sort(
      (a, b) =>
        new Date(a.filmInfo.release.date).getTime() -
        new Date(b.filmInfo.release.date).getTime()
    );
    this.#clearMainFilmsList();
    this.#renderMainFilmsList();
  };

  #sortFilmsByRating = () => {
    this.mainFilms = [...this.#filmsModel.films].sort(
      (a, b) => a.filmInfo.totalRating - b.filmInfo.totalRating
    );
    this.#clearMainFilmsList();
    this.#renderMainFilmsList();
  };
}

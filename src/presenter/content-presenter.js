import ContentView from '../view/content-view.js';
import FilmsListView from '../view/films-list-view';
import FilmsListContainerView from '../view/films-list-container-view';
import FilmsListExtraView from '../view/films-list-extra-view';
import FilmView from '../view/film-view';
import ShowMoreButtonView from '../view/show-more-button-view';

import {render} from '../render';

export default class ContentPresenter {
  #contentComponent = new ContentView();
  #mainFilmsList = new FilmsListView();
  #mainFilmsListContainer = new FilmsListContainerView();

  #topRatedFilmsList = new FilmsListExtraView('Top rated');
  #topRatedFilmsListContainer = new FilmsListContainerView();

  #mostCommentedFilmsList = new FilmsListExtraView('Most commented');
  #mostCommentedFilmsListContainer = new FilmsListContainerView();

  #contentContainer = null;
  #filmsModel = null;
  #mainFilms = null;
  #relatedFilms = null;
  #commentedFilms = null;

  init = (contentContainer, filmsModel) =>{
    this.#contentContainer = contentContainer;
    this.#filmsModel = filmsModel;
    this.#mainFilms = [...this.#filmsModel.films];
    this.#relatedFilms = [...this.#filmsModel.films].slice(0,2);
    this.#commentedFilms = [...this.#filmsModel.films].slice(0,2);

    // render(this.#contentComponent, this.#contentContainer);
    // render(this.#mainFilmsList, this.#contentComponent.element);
    // render(this.#mainFilmsListContainer, this.#mainFilmsList.element);
    // render(new ShowMoreButtonView, this.#mainFilmsList.element);

    // for (const film of this.#mainFilms){
    //   render(new FilmView(film), this.#mainFilmsListContainer.element);
    // }

    // render(this.#topRatedFilmsList, this.#contentComponent.element);
    // render(this.#topRatedFilmsListContainer, this.#topRatedFilmsList.element);

    // for (const film of this.#relatedFilms){
    //   render(new FilmView(film), this.#topRatedFilmsListContainer.element);
    // }

    // render(this.#mostCommentedFilmsList, this.#contentComponent.element);
    // render(this.#mostCommentedFilmsListContainer, this.#mostCommentedFilmsList.element);
    // for (const film of this.#commentedFilms){
    //   render(new FilmView(film), this.#mostCommentedFilmsListContainer.element);
    // }
  };
}

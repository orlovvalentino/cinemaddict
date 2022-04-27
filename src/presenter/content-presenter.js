import ContentView from '../view/content-view.js';
import FilmsListView from '../view/films-list-view';
import FilmsListContainerView from '../view/films-list-container-view';
import FilmsListExtraView from '../view/films-list-extra-view';
import FilmView from '../view/film-view';
import ShowMoreButtonView from '../view/show-more-button-view';

import {render} from '../render';

export default class ContentPresenter {
  contentComponent = new ContentView();
  mainFilmsList = new FilmsListView();
  mainFilmsListContainer = new FilmsListContainerView();

  topRatedFilmsList = new FilmsListExtraView('Top rated');
  topRatedFilmsListContainer = new FilmsListContainerView();

  mostCommentedFilmsList = new FilmsListExtraView('Most commented');
  mostCommentedFilmsListContainer = new FilmsListContainerView();

  init = (contentContainer) =>{
    this.contentContainer = contentContainer;

    render(this.contentComponent, this.contentContainer);
    render(this.mainFilmsList, this.contentComponent.getElement());
    render(this.mainFilmsListContainer, this.mainFilmsList.getElement());
    render(new ShowMoreButtonView, this.mainFilmsList.getElement());

    for (let i = 0; i < 5; i++) {
      render(new FilmView(), this.mainFilmsListContainer.getElement());
    }

    render(this.topRatedFilmsList, this.contentComponent.getElement());
    render(this.topRatedFilmsListContainer, this.topRatedFilmsList.getElement());
    for (let i = 0; i < 2; i++) {
      render(new FilmView(), this.topRatedFilmsListContainer.getElement());
    }

    render(this.mostCommentedFilmsList, this.contentComponent.getElement());
    render(this.mostCommentedFilmsListContainer, this.mostCommentedFilmsList.getElement());
    for (let i = 0; i < 2; i++) {
      render(new FilmView(), this.mostCommentedFilmsListContainer.getElement());
    }
  };
}

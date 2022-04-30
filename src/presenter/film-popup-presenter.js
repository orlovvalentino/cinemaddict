import FilmPopupView from '../view/film-popup-view';

import {render} from '../render';

export default class FilmPopupPresenter {

  init = (container, filmModel) =>{
    this.container = container;
    this.film = filmModel.getFilm();

    render(new FilmPopupView(this.film), this.container);

  };
}

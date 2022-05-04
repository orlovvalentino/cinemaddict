import {generateFilm} from '../../mock/film';

export  default class FilmModel {
  #film = generateFilm();
  get film (){
    return this.#film;
  }
}

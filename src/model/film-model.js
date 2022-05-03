import {generateFilm} from '../../mock/film';

export  default class FilmModel {
  film = generateFilm();
  getFilm =() => this.film;
}

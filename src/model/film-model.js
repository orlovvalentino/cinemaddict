import {generateFilms} from '../../mock/films';

export  default class FilmModel {
  film = generateFilms();
  getFilm =() => this.film;
}

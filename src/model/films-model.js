import {generateFilms} from '../../mock/films';

export  default class FilmsModel {
  films = Array.from({length:5}, generateFilms);
  getFilms =() => this.films;
}

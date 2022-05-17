import {generateFilm} from '../../mock/film';

class FilmsModel {
  #films = Array.from({length: 22}, generateFilm);

  get films() {
    return this.#films;
  }
}
const filmsModel = new FilmsModel();
export {filmsModel};

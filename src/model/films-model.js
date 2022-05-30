import { generateFilm } from "../../mock/film";
import Observable from "../framework/observable";

class FilmsModel extends Observable {
  #films = Array.from({ length: 22 }, generateFilm);

  get films() {
    return this.#films;
  }
  set films(newFilms) {
    this.#films = newFilms;
  }

  updateFilm = (update) => {
    const index = this.#films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error("Can't update unexisting film");
    }
    this.#films = [
      ...this.#films.slice(0, index),
      update,
      ...this.#films.slice(index + 1),
    ];
  };
}
const filmsModel = new FilmsModel();
export { filmsModel };

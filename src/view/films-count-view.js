import AbstractView from '../framework/view/abstract-view.js';

const createFilmsCountTemplate = (count) => count > 1 ? `<p>${count} movies inside</p>` : `<p>${count} movies inside</p>`;

export default class FilmsCountView extends AbstractView {
  #count = null;

  constructor(count) {
    super();
    this.#count = count;
  }

  get template() {
    return createFilmsCountTemplate(this.#count);
  }
}

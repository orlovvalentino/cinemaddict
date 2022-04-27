import {createElement} from '../render.js';

const createFilmsListExtraTemplate = (title) => (`<section class="films-list films-list--extra">
                                        <h2 class="films-list__title">${title}</h2>
                                      </section>`);

export default class FilmsListExtraView {
  constructor(title) {
    this.title = title;
  }

  getTemplate() {
    return createFilmsListExtraTemplate(this.title);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}

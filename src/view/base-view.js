import {createElement} from '../render.js';

export default class BaseView {
  #element = null;
  #template = '';

  get template(){
    return this.#template;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}

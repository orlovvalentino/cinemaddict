import BaseView from './base-view.js';

const createFilmsCountTemplate = () => '<p>130 291 movies inside</p>';

export default class FilmsCountView  extends BaseView{
  #template = createFilmsCountTemplate();
  get template() {
    return this.#template;
  }
}

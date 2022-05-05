import BaseView from './base-view.js';

const createFilmsListContainerTemplate = () => '<div class="films-list__container"></div>';

export default class FilmsListContainerView extends BaseView {
  #template = createFilmsListContainerTemplate();
  get template() {
    return this.#template;
  }
}

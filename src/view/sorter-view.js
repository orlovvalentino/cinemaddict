import BaseView from './base-view.js';

const createSorterTemplate = () => `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" class="sort__button">Sort by date</a></li>
    <li><a href="#" class="sort__button">Sort by rating</a></li>
  </ul>`;

export default class SorterView extends BaseView{
  #template = createSorterTemplate();

  get template() {
    return this.#template;
  }
}

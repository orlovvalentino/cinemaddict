import AbstractView from '../framework/view/abstract-view.js';
import {EmptyList} from '../const';

const createFilmsListEmptyTemplate = (emptyText) => (`
    <section class="films-list">
      <h2 class="films-list__title">${emptyText}</h2>
    </section>
`);

export default class FilmsListEmptyView extends AbstractView {
  #emptyText = null;
  constructor(currentFilter) {
    super();
    this.#emptyText = EmptyList[currentFilter];
  }

  get template() {
    return createFilmsListEmptyTemplate(this.#emptyText);
  }
}

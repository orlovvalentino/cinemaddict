import BaseView from './base-view.js';

const createFilmsListTemplate = () => (`<section class="films-list">
                                        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
                                      </section>`);

export default class FilmsListView extends BaseView{
  #template = createFilmsListTemplate();

  get template() {
    return this.#template;
  }
}

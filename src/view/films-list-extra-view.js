import BaseView from './base-view.js';

const createFilmsListExtraTemplate = (title) => (`<section class="films-list films-list--extra">
                                        <h2 class="films-list__title">${title}</h2>
                                      </section>`);

export default class FilmsListExtraView extends BaseView{
  #title = null;

  constructor(title) {
    super();
    this.#title = title;
  }

  get template() {
    return createFilmsListExtraTemplate(this.title);
  }
}

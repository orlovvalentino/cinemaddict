import BaseView from './base-view.js';

const createShowMoreButtonTemplate = () => '<button class="films-list__show-more">Show more</button>';

export default class ShowMoreButtonView extends BaseView{
  #template = createShowMoreButtonTemplate();

  get template() {
    return this.#template;
  }
}

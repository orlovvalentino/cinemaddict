import BaseView from './base-view.js';

const createCommentsListTemplate = () => '<ul class="film-details__comments-list"></ul>';

export default class CommentsBlockView extends BaseView{
  #template = createCommentsListTemplate();

  get template() {
    return this.#template;
  }

}

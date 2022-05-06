import AbstractView from '../framework/view/abstract-view.js';

const createCommentsListTemplate = () => '<ul class="film-details__comments-list"></ul>';

export default class CommentsBlockView extends AbstractView {

  get template() {
    return createCommentsListTemplate();
  }

}

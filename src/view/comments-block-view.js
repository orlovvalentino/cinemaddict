import BaseView from './base-view.js';

const createCommentsBLockTemplate = (count) => (`
    <section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${count}</span></h3>
    </section>
`);

export default class CommentsBlockView extends BaseView{
  #count = null;

  constructor(count) {
    super();
    this.#count = count;
  }

  get template() {
    return createCommentsBLockTemplate(this.#count);
  }
}

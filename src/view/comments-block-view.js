import {createElement} from '../render.js';

const createCommentsBLockTemplate = (count) => (`
    <section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${count}</span></h3>
    </section>
`);

export default class CommentsBlockView {
  constructor(count) {
    this.count = count;
  }

  getTemplate() {
    return createCommentsBLockTemplate(this.count);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}

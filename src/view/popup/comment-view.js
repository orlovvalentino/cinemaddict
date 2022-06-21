import {humanizeCommentDate} from '../../utils';
import AbstractView from '../../framework/view/abstract-view.js';

const createCommentTemplate = (comments) => (
  `<section class="film-details__comments-wrap"><h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
        <ul class="film-details__comments-list">
            ${comments.map((comment) => `<li class="film-details__comment">
            <span class="film-details__emotion">
              <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-${comment.emotion}">
            </span>
            <div>
              <p class="film-details__comment-text">${comment.comment}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${comment.author}</span>
                <span class="film-details__comment-day">${humanizeCommentDate(comment.date)}</span>
                <button class="film-details__comment-delete" type="button" data-id="${comment.id}">Delete</button>
              </p>
            </div>
          </li>`).join('')}
        </ul>
      </section>`
);

export default class CommentView extends AbstractView {
  #comments = null;

  constructor(comments) {
    super();
    this.#comments = comments;
  }

  get template() {
    return createCommentTemplate(this.#comments);
  }

  setDeleteClickHandler = (callback) => {
    this._callback.deleteClick = callback;
    this.element.querySelectorAll('.film-details__comment-delete').forEach((item) => item.addEventListener('click', this.#deleteClickHandler));
  };

  #deleteClickHandler = (evt) => {
    if (evt.target.tagName !== 'BUTTON') {
      return;
    }
    evt.target.innerText = 'Deleting...';
    evt.preventDefault();
    this._callback.deleteClick(evt.target.dataset.id, 'delete');
  };
}

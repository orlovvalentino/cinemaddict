import FilmPopupView from '../view/film-popup-view';
import CommentsBlockView from '../view/comments-block-view.js';
import CommentView from '../view/comment-view.js';

import {render} from '../render';

export default class FilmPopupPresenter {
  #container = null;
  #film = null;
  #comments = null;
  #filmPopupView = null;
  #commentsBlockView = null;

  init = (container, filmModel, comments) => {
    this.#container = container;
    this.#film = filmModel.film;
    this.#comments = comments.comments;
    this.#filmPopupView = new FilmPopupView(this.#film);
    this.#commentsBlockView = new CommentsBlockView(this.#comments.length);

    render(this.#filmPopupView, this.#container);
    render(this.#commentsBlockView, this.#filmPopupView.element.querySelector('.film-details__bottom-container'));
    for (const comment of this.#comments) {
      render(new CommentView(comment), this.#commentsBlockView.element);
    }
  };
}

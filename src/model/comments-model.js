import { generateComment } from '../../mock/comments.js';
import Observable from '../framework/observable';

export default class CommentsModel extends Observable {
  #comments = Array.from({ length: 10 }, generateComment).map((item, i) => ({
    ...item,
    id: i,
  }));

  get comments() {
    return this.#comments;
  }

  set comments(newComments) {
    this.#comments = newComments;
  }
}

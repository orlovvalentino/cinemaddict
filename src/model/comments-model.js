import { generateComment } from '../../mock/comments.js';
import Observable from '../framework/observable';

export default class CommentsModel extends Observable {
  #comments = Array.from({ length: 100 }, generateComment).map((item, i) => ({
    ...item,
    id: i,
  }));

  get comments() {
    return this.#comments;
  }

  set comments(newComments) {
    this.#comments = newComments;
  }

  deleteComment = (updateType, id) => {

    const index = this.comments.findIndex((comment) => comment.id === Number(id));

    if(index === -1){
      throw new Error('Can\'t delete unexciting comment');
    }

    this.#comments = [
      ...this.#comments.slice(0, index),
      ...this.#comments.slice(index + 1),
    ];

    this._notify(updateType);
  };
}

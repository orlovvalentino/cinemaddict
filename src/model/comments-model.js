import {generateComment} from '../../mock/comments.js';

export  default class CommentsModel {
  #comments = Array.from({length:10}, generateComment).map((item,i)=>({ ...item, id: i }));
  get comments(){
    return this.#comments;
  }
}

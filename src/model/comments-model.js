import {generateComments} from '../../mock/comments.js';

export  default class CommentsModel {
  comments = Array.from({length:5}, generateComments);
  getComments =() => this.comments;
}

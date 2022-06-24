import Observable from '../framework/observable';
import {UpdateType} from '../const';

export default class CommentsModel extends Observable {
  #filmsApiService = null;
  #comments = [];

  constructor(filmsApiService) {
    super();
    this.#filmsApiService = filmsApiService;
  }

  get comments() {
    return this.#comments;
  }

  set comments(newComments) {
    this.#comments = newComments;
  }

  init = async (id) => {
    try {
      this.#comments = await this.#filmsApiService.getComments(id);
    } catch (err) {
      this.#comments = [];
    }
    this._notify(UpdateType.INIT);
  };

  updateComments = (updateType,comments)=>{
    this.#comments = comments;
    this._notify(updateType, comments);
  };

  deleteComment = (updateType, id) => {
    const index = this.comments.findIndex((comment) => comment.id === id);

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

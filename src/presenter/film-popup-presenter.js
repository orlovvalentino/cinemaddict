import FilmPopupView from '../view/film-popup-view';
import CommentsBlockView from '../view/comments-block-view.js';
import CommentView from '../view/comment-view.js';

import {render} from '../render';

export default class FilmPopupPresenter {

  init = (container, filmModel, comments) =>{
    this.container = container;
    this.film = filmModel.getFilm();
    this.comments = comments.getComments();
    this.filmPopupView= new FilmPopupView(this.film);
    this.commentsBlockView = new CommentsBlockView(this.comments.length);

    render(this.filmPopupView, this.container);
    render(this.commentsBlockView, this.filmPopupView.getElement().querySelector('.film-details__bottom-container'));
    for (const comment of this.comments){
      render(new CommentView(comment), this.commentsBlockView.getElement());
    }
  };
}

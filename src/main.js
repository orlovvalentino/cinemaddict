import ProfileView from './view/profile-view.js';
import MenuView from './view/menu-view.js';
import SorterView from './view/sorter-view.js';

import FilmsCountView from './view/films-count-view.js';

import {render} from './render.js';
import ContentPresenter from './presenter/content-presenter';
import FilmsModel from './model/films-model.js';
import FilmModel from './model/film-model.js';
import CommentsModel from './model/comments-model.js';
import FilmPopupPresenter from './presenter/film-popup-presenter.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const filmsModel  = new FilmsModel();
const filmModel  = new FilmModel();
const commentsModel = new CommentsModel();
const contentPresenter = new ContentPresenter();
const footerStatisticElement = document.querySelector('.footer__statistics');
const filmPopupPresenter = new FilmPopupPresenter();

render(new ProfileView(), siteHeaderElement);
render(new MenuView(), siteMainElement);
render(new SorterView(), siteMainElement);

contentPresenter.init(siteMainElement,filmsModel);
filmPopupPresenter.init(document.body, filmModel, commentsModel);

render(new FilmsCountView(), footerStatisticElement);

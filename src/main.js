import ProfileView from './view/profile-view.js';
import MenuView from './view/menu-view.js';

import FilmsCountView from './view/films-count-view.js';

import {render} from './render.js';
import ContentPresenter from './presenter/content-presenter';
import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comments-model.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const filmsModel  = new FilmsModel();

const contentPresenter = new ContentPresenter();
const footerStatisticElement = document.querySelector('.footer__statistics');

const commentsModel = new CommentsModel();

render(new ProfileView(), siteHeaderElement);
render(new MenuView(), siteMainElement);


contentPresenter.init(siteMainElement,filmsModel, document.body, commentsModel);

render(new FilmsCountView(filmsModel.films.length), footerStatisticElement);

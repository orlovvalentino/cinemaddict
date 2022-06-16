import ProfileView from './view/profile-view.js';
import FilmsCountView from './view/films-count-view.js';

import { render } from './render.js';
import FilterPresenter from './presenter/filter-presenter.js';
import ContentPresenter from './presenter/content-presenter';
import { filmsModel } from './model/films-model.js';
import CommentsModel from './model/comments-model.js';
import FilterModel from './model/filter-model.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const filterModel = new FilterModel();
const commentsModel = new CommentsModel();

const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmsModel);
const contentPresenter = new ContentPresenter(siteMainElement, filmsModel, document.body, commentsModel,filterModel);

const footerStatisticElement = document.querySelector('.footer__statistics');

render(new ProfileView(filterModel.watchedRank), siteHeaderElement);

filterPresenter.init();
contentPresenter.init();

render(new FilmsCountView(filmsModel.films.length), footerStatisticElement);

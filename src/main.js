import ProfileView from './view/profile-view.js';
import FilmsCountView from './view/films-count-view.js';

import { render } from './render.js';
import FilterPresenter from './presenter/filter-presenter.js';
import ContentPresenter from './presenter/content-presenter';
import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comments-model.js';
import FilterModel from './model/filter-model.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

import FilmsApiService from './films-api-service';

const AUTHORIZATION = 'Basic qawsedrftgyhujxd55';
const END_POINT = 'https://17.ecmascript.pages.academy/cinemaddict';
const filmsModel = new FilmsModel(new FilmsApiService(END_POINT, AUTHORIZATION));
const commentsModel = new CommentsModel(new FilmsApiService(END_POINT, AUTHORIZATION));
const filterModel = new FilterModel(filmsModel);

const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmsModel);
const contentPresenter = new ContentPresenter(siteMainElement, filmsModel, document.body, commentsModel, filterModel);


const footerStatisticElement = document.querySelector('.footer__statistics');

render(new ProfileView(filterModel.watchedRank), siteHeaderElement);

filterPresenter.init();
contentPresenter.init();
filmsModel.init();

render(new FilmsCountView(filmsModel.films.length), footerStatisticElement);

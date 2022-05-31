import ProfileView from './view/profile-view.js';
import FilmsCountView from './view/films-count-view.js';

import { render } from './render.js';
import FilterPresenter from './presenter/filter-presenter.js';
import ContentPresenter from './presenter/content-presenter';
import { filmsModel } from './model/films-model.js';
import CommentsModel from './model/comments-model.js';
import CustomerStorageModel from './model/customer-storage-model.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const customerStorageModel = new CustomerStorageModel();

const filterPresenter = new FilterPresenter();
const contentPresenter = new ContentPresenter();
const footerStatisticElement = document.querySelector('.footer__statistics');

const commentsModel = new CommentsModel();
render(new ProfileView(customerStorageModel.watchedRank), siteHeaderElement);
filterPresenter.init(siteMainElement, customerStorageModel);
contentPresenter.init(
  siteMainElement,
  filmsModel,
  document.body,
  commentsModel
);

render(new FilmsCountView(filmsModel.films.length), footerStatisticElement);

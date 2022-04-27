import ProfileView from './view/profile-view.js';
import MenuView from './view/menu-view.js';
import SorterView from './view/sorter-view.js';

import FilmsCountView from './view/films-count-view.js';

import {render} from './render.js';
import ContentPresenter from './presenter/content-presenter';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const contentPresenter = new ContentPresenter();
const footerStatisticElement = document.querySelector('.footer__statistics');

render(new ProfileView(), siteHeaderElement);
render(new MenuView(), siteMainElement);
render(new SorterView(), siteMainElement);
contentPresenter.init(siteMainElement);

render(new FilmsCountView(), footerStatisticElement);

import AbstractView from '../framework/view/abstract-view.js';
// sort__button--active
const createSorterTemplate = (sort) => `<ul class="sort">
    <li><a href="#" data-sort="default" class="sort__button ${sort ==='default' ? 'sort__button--active':''}">Sort by default</a></li>
    <li><a href="#" data-sort="date" class="sort__button ${sort ==='date' ? 'sort__button--active':''}">Sort by date</a></li>
    <li><a href="#" data-sort="rating" class="sort__button ${sort ==='rating' ? 'sort__button--active':''} ">Sort by rating</a></li>
  </ul>`;

export default class SorterView extends AbstractView {
  #sort = null;

  constructor(sort) {
    super();
    this.#sort = sort;
  }

  get template() {
    return createSorterTemplate(this.#sort);
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelectorAll('.sort__button');
    for (const item of this.element.querySelectorAll('.sort__button')) {
      item.addEventListener('click', (ev) => {
        this.element.querySelectorAll('.sort__button').forEach((link) => link.classList.remove('sort__button--active'));
        this.#setClickHandler(ev);
      });
    }
  };

  #setClickHandler = (evt) => {
    evt.preventDefault();
    evt.target.classList.add('sort__button--active');
    this._callback.click(evt.target.dataset.sort);
  };
}

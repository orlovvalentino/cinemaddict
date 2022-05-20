import {render, remove} from '../framework/render';
import ShowMoreButtonView from '../view/show-more-button-view';

export default class ShowMoreButtonPresenter {
  #container = null;
  #showMoreButton = null;

  constructor(container) {
    this.#container = container;
  }

  init = (showMoreFilms) => {
    this.#showMoreButton = new ShowMoreButtonView();
    render(this.#showMoreButton, this.#container);
    this.#showMoreButton.setClickHandler(showMoreFilms);
  };

  destroy = () => {
    this.#showMoreButton.removeClickHandler();
    remove(this.#showMoreButton);
  };
}

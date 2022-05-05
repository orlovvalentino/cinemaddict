import BaseView from './base-view.js';

const createContentTemplate = () => '<section class="films"></section>';

export default class ContentView extends BaseView{
  #template = createContentTemplate();
  get template() {
    return this.#template;
  }
}

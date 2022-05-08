import AbstractView from '../framework/view/abstract-view.js';

const createProfileTemplate = (watched) => `<section class="header__profile profile ${watched ? '':'visually-hidden'}">
    <p class="profile__rating">${watched}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;

export default class ProfileView extends AbstractView {
  #watched = null;

  constructor(watched) {
    super();
    this.#watched = watched;
  }

  get template() {
    return createProfileTemplate(this.#watched);
  }
}

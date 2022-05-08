import {customerStorage} from '../../mock/customer-storage.js';

export default class CustomerStorageModel {
  #customerStorage = customerStorage();
  #watched = this.#customerStorage.watched;

  get customerStorage() {
    return this.#customerStorage;
  }

  get watchedCount() {
    switch(true) {
      case (this.#watched >=1 && this.#watched <=10 ):
        return 'novice';
      case (this.#watched >=11 && this.#watched <=20 ):
        return 'fun';
      case (this.#watched >=21):
        return 'movie buff';
      default:
        return null;
    }
  }
}

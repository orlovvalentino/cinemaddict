import AbstractStatefulView from '../../framework/view/abstract-stateful-view';
import he from 'he';

const createCommentsFormTemplate = (data) => {
  const emoji = data.emoji;
  const text = data.text ?? '';

  return (
    `<div class="film-details__new-comment">
    <div class="film-details__add-emoji-label">
        ${emoji ? `<img src="images/emoji/${emoji}.png" width="55" height="55" alt="emoji-smile">` : ''}
    </div>
    <label class="film-details__comment-label">
      <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${text}</textarea>
    </label>

    <div class="film-details__emoji-list">
      <input class="film-details__emoji-item visually-hidden" name="emotion" type="radio" id="emoji-smile" value="smile"
        ${emoji ==='smile' ? 'checked':''}
      >
      <label class="film-details__emoji-label" for="emoji-smile">
        <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
      </label>

      <input class="film-details__emoji-item visually-hidden" name="emotion" type="radio" id="emoji-sleeping" value="sleeping"
        ${emoji ==='sleeping' ? 'checked':''}>
      <label class="film-details__emoji-label" for="emoji-sleeping">
        <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
      </label>

      <input class="film-details__emoji-item visually-hidden" name="emotion" type="radio" id="emoji-puke" value="puke"
        ${emoji ==='puke' ? 'checked':''}
      >
      <label class="film-details__emoji-label" for="emoji-puke">
        <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
      </label>

      <input class="film-details__emoji-item visually-hidden" name="emotion" type="radio" id="emoji-angry" value="angry"
        ${emoji ==='angry' ? 'checked':''}
      >
      <label class="film-details__emoji-label" for="emoji-angry">
        <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
      </label>
    </div>
  </div>`
  );
};

export default class CommentFormView extends AbstractStatefulView {
  constructor() {
    super();
    this._state.text = '';
    this._state.emoji = '';
  }

  get template() {
    return createCommentsFormTemplate(this._state);
  }

  setEmojiChangeHandler = () => {
    this.element.querySelectorAll('.film-details__emoji-item').forEach((el) => {
      el.addEventListener('change', this.#emojiChangeHandler);
    });
  };

  #emojiChangeHandler = (evt) => {
    this._state.emoji = evt.target.value;
    this.updateElement({
      emoji: evt.target.value,
    });
  };

  setInputChangeHandler = ()=>{
    this.element.querySelector('.film-details__comment-input').addEventListener('keyup', this.#inputKeyPress);
  };

  #inputKeyPress = (evt) => {
    this._state.text = evt.target.value;
  };

  _restoreHandlers = () => {
    this.setEmojiChangeHandler();
    this.setInputChangeHandler();
  };
}

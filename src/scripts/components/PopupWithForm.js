import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, submitHandler) {
    super(selector);
    this._submitHandler = submitHandler;
    this.submitFormHandler = this._submitFormHandler.bind(this);
    this._form = this._popup.querySelector(".form");
    this.open = this._open.bind(this);
  }

  _open() {
    this._form.reset();
    super._open();
  }

  _submitFormHandler() {
    this._submitHandler();
    this.close();
    // без доп ресета на сабмит кнопка остается активной, хотя у всех полей valid === false
    this._form.reset();
  }

  _setEventListeners() {
    this._form.addEventListener("submit", this.submitFormHandler);
    super._setEventListeners();
  }
}

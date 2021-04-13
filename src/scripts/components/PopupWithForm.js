import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, submitHandler) {
    super(selector);
    this._submitHandler = submitHandler.bind(this);
    this._form = this._popup.querySelector(".form");
    this.submitButton = this._form.querySelector(".button_type_save");
    this.close = this.close.bind(this);
  }

  close() {
    this._form.reset();
    super.close();
  }

  _setEventListeners() {
    this._form.addEventListener("submit", this._submitHandler);
    super._setEventListeners();
  }

  _removeEventListeners() {
    this._form.removeEventListener("submit", this._submitHandler);
    super._removeEventListeners();
  }
}

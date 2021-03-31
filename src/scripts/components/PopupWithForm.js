import Popup from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(selector, submitHandler) {
    super(selector);
    this._submitHandler = submitHandler;
    this._form = this._popup.querySelector(".form");
  }

  _getInputValues() {
    console.log(this._form);
    return;
  }

  _submitFormHandler() {
    this._submitHandler();
    this._form.reset();
  }

  _setEventListeners() {
    this._form.addEventListener("submit", this._submitFormHandler);
    super._setEventListeners();
  }

  close() {
    this._form.reset();
    super.close();
  }
}

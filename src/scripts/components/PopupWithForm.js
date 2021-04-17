import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, submitHandler, options) {
    super(selector);
    this._submitHandler = submitHandler;
    this._submitForm = this._submitForm.bind(this);
    this._form = this._popup.querySelector(".form");
    this.submitButton = this._form.querySelector(".button_type_save");
    this.close = this.close.bind(this);
    this._options = options || {};

    // true by default
    this._options.resetOnClose =
      this._options.resetOnClose === undefined
        ? true
        : this._options.resetOnClose;
  }

  close() {
    if (this._options.resetOnClose) {
      this._form.reset();
      super.close();
    } else {
      super.close();
    }
  }

  _submitForm() {
    const inputValues = this._getInputValues();
    this._submitHandler(inputValues);
  }

  _getInputValues() {
    return this._form.elements;
  }

  _setEventListeners() {
    this._form.addEventListener("submit", this._submitForm);
    super._setEventListeners();
  }

  _removeEventListeners() {
    this._form.removeEventListener("submit", this._submitForm);
    super._removeEventListeners();
  }
}

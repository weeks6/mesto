export default class Popup {
  constructor(selector) {
    this._pageElement = document.querySelector(".page");
    this._popup = document.querySelector(selector);
    this._popupCloseButton = this._popup.querySelector(".button_type_close");
  }

  open() {
    this._popup.classList.add("popup_opened");
    this._pageElement.classList.add("page_no-overflow");
    this._setEventListeners();
  }
  close() {
    this._popup.classList.remove("popup_opened");
    this._pageElement.classList.remove("page_no-overflow");
    this._removeEventListeners();
  }

  _handleEscClose(evt) {
    console.log(evt);
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleOverlayClose(evt) {
    console.log(evt);
    if (evt.target === this._popup) {
      this.close();
    }
  }

  _setEventListeners() {
    this._popupCloseButton.addEventListener("click", this.close);
    document.addEventListener("click", this._handleOverlayClose);
    document.addEventListener("keydown", this._handleEscClose);
  }
  _removeEventListeners() {
    this._popupCloseButton.removeEventListener("click", this.close);
    document.removeEventListener("click", this._handleOverlayClose);
    document.removeEventListener("keydown", this._handleEscClose);
  }
}

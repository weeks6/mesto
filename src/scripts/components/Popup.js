export default class Popup {
  constructor(selector) {
    this._pageElement = document.querySelector(".page");
    this._popup = document.querySelector(selector);
    this._popupCloseButton = this._popup.querySelector(".button_type_close");
    this.handleEscClose = this._handleEscClose.bind(this);
    this.handleOverlayClose = this._handleOverlayClose.bind(this);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);

    this._popupCloseButton.addEventListener("click", this.close);
    this._popup.addEventListener("click", this.handleOverlayClose);
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
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleOverlayClose(evt) {
    if (evt.target === this._popup) {
      this.close();
    }
  }

  _setEventListeners() {
    document.addEventListener("keydown", this.handleEscClose);
  }

  _removeEventListeners() {
    document.removeEventListener("keydown", this.handleEscClose);
  }
}

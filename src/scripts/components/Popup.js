export default class Popup {
  constructor(selector) {
    this._pageElement = document.querySelector(".page");
    this._popup = document.querySelector(selector);
    this._popupCloseButton = this._popup.querySelector(".button_type_close");
    this.handleEscClose = this._handleEscClose.bind(this);
    this.handleOverlayClose = this._handleOverlayClose.bind(this);
    this.close = this._close.bind(this);
    this.open = this._open.bind(this);
  }

  _open() {
    this._popup.classList.add("popup_opened");
    this._pageElement.classList.add("page_no-overflow");
    this._setEventListeners();
  }

  _close() {
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
    this._popupCloseButton.addEventListener("click", this.close);
    document.addEventListener("click", this.handleOverlayClose);
    document.addEventListener("keydown", this.handleEscClose);
  }
  _removeEventListeners() {
    this._popupCloseButton.removeEventListener("click", this.close);
    document.removeEventListener("click", this.handleOverlayClose);
    document.removeEventListener("keydown", this.handleEscClose);
  }
}

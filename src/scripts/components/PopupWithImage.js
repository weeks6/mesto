import Popup from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(selector, pageSelector = ".page") {
    super(selector, pageSelector);
    this._image = this._popup.querySelector(".popup-image__image");
    this._title = this._popup.querySelector(".popup-image__title");
  }

  open(src, title) {
    this._image.src = src;
    this._title.textContent = title;
    super.open();
  }
}

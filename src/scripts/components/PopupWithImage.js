import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._image = this._popup.querySelector(".image-popup__image");
    this._title = this._popup.querySelector(".image-popup__title");
  }

  open({ src, title }) {
    this._image.src = src;
    this._title.textContent = title;
    super.open();
  }
}

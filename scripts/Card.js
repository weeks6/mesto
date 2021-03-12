import { openPopup } from "./index.js";

export class Card {
  constructor(cardSelector, cardTitle, imageSrc, imagePopup) {
    this._cardSelector = cardSelector;
    this._cardTitle = cardTitle;
    this._imageSrc = imageSrc;
    this._imagePopup = imagePopup;
  }

  generateCard() {
    this._element = this._getTemplate();

    const cardImage = this._element.querySelector(".card__image");
    const cardTitle = this._element.querySelector(".card__title");

    cardTitle.textContent = this._cardTitle;
    cardImage.src = this._imageSrc;
    cardImage.alt = this._cardTitle;

    this._setEventListeners();

    return this._element;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _handleDeleteButton = () => {
    const parentElement = this._element.closest("li.card");
    parentElement.remove();
  };

  _handleLikeButton = () => {
    this._element
      .querySelector(".button_type_like")
      .classList.toggle("button_type_like_active");
  };

  _handleImagePopup = () => {
    const imagePopupImg = this._imagePopup.querySelector(".image-popup__image");
    const imagePopupTitle = this._imagePopup.querySelector(
      ".image-popup__title"
    );

    imagePopupImg.src = this._imageSrc;
    imagePopupImg.alt = this._cardTitle;
    imagePopupTitle.textContent = this._cardTitle;

    openPopup(this._imagePopup);
  };

  _setEventListeners() {
    this._element
      .querySelector(".button_type_like")
      .addEventListener("click", this._handleLikeButton);

    this._element
      .querySelector(".button_type_delete")
      .addEventListener("click", this._handleDeleteButton);

    this._element
      .querySelector(".card__image")
      .addEventListener("click", this._handleImagePopup);
  }
}

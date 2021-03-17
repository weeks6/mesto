import { openPopup } from "./index.js";

export class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._cardSelector = cardSelector;
    this._title = data.title;
    this._src = data.src;
    this._handleCardClick = handleCardClick;
  }

  generateCard() {
    this._element = this._getTemplate();

    const cardImage = this._element.querySelector(".card__image");
    const cardTitle = this._element.querySelector(".card__title");

    cardTitle.textContent = this._title;
    cardImage.src = this._src;
    cardImage.alt = this._title;

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

  _setEventListeners() {
    this._element
      .querySelector(".button_type_like")
      .addEventListener("click", this._handleLikeButton);

    this._element
      .querySelector(".button_type_delete")
      .addEventListener("click", this._handleDeleteButton);

    this._element
      .querySelector(".card__image")
      .addEventListener("click", () =>
        this._handleCardClick(this._title, this._src)
      );
  }
}

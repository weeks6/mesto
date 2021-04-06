export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._cardSelector = cardSelector;
    this._title = data.title;
    this._src = data.src;
    this._likes = data.likes;
    this._handleCardClick = handleCardClick;
    this._handleLikeButton = this._handleLikeButton.bind(this);
    this._handleDeleteButton = this._handleDeleteButton.bind(this);
  }

  generateCard() {
    this._element = this._getTemplate();

    this._imageElement = this._element.querySelector(".card__image");
    this._titleElement = this._element.querySelector(".card__title");
    this._likesElement = this._element.querySelector(".card__like-counter");
    this._likeButtonElement = this._element.querySelector(".button_type_like");
    this._deleteButtonElement = this._element.querySelector(
      ".button_type_delete"
    );

    this._titleElement.textContent = this._title;
    this._imageElement.src = this._src;
    this._imageElement.alt = this._title;

    this._likesElement.textContent = this._likes.length;
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

  _handleDeleteButton() {
    const parentElement = this._element.closest("li.card");
    parentElement.remove();
  }

  _handleLikeButton() {
    this._likeButtonElement.classList.toggle("button_type_like_active");
  }

  _setEventListeners() {
    this._likeButtonElement.addEventListener("click", this._handleLikeButton);

    this._deleteButtonElement.addEventListener(
      "click",
      this._handleDeleteButton
    );

    this._imageElement.addEventListener("click", () =>
      this._handleCardClick(this._src, this._title)
    );
  }
}

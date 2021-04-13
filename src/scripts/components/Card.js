export default class Card {
  constructor(
    { _id, name, link, likes, owner },
    currentUserId,
    cardSelector,
    popupHandler,
    deleteHandler,
    likeHandler
  ) {
    this._cardSelector = cardSelector;
    this._id = _id;
    this._title = name;
    this._src = link;
    this._likes = likes;
    this._currentUserId = currentUserId;
    this._isOwner = this._currentUserId === owner._id;
    this._popupHandler = popupHandler;
    this._deleteHandler = deleteHandler;
    this._likeHandler = likeHandler;
    this._handleCardClick = this._handleCardClick.bind(this);
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

    if (this.isLikedBy(this._currentUserId)) {
      this._likeButtonElement.classList.add("button_type_like_active");
    }

    this._setEventListeners();
    return this._element;
  }

  getElement() {
    return this._element;
  }

  isLikedBy(userId) {
    return this._likes.find((user) => user._id === userId);
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _handleDeleteButton() {
    this._deleteHandler();
  }

  _handleLikeButton() {
    this._likeHandler().then((res) => {
      this._likes = res.likes;
      this._likesElement.textContent = this._likes.length;
      if (this.isLikedBy(this._currentUserId)) {
        this._likeButtonElement.classList.add("button_type_like_active");
      } else {
        this._likeButtonElement.classList.remove("button_type_like_active");
      }
    });
  }

  _handleCardClick() {
    this._popupHandler(this._src, this._title);
  }

  _setEventListeners() {
    this._likeButtonElement.addEventListener("click", this._handleLikeButton);

    if (this._isOwner) {
      this._deleteButtonElement.addEventListener(
        "click",
        this._handleDeleteButton
      );
    } else {
      this._deleteButtonElement.remove();
    }

    this._imageElement.addEventListener("click", this._handleCardClick);
  }
}

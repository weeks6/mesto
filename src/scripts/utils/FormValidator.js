export default class FormValidator {
  constructor(
    {
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass,
    },
    formElement
  ) {
    this._formElement = formElement;
    this._inputSelector = inputSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputErrorClass = inputErrorClass;
    this._inputList = this._getInputList();
    this._submitButton = this._formElement.querySelector(submitButtonSelector);
  }

  _getInputList() {
    return Array.from(this._formElement.querySelectorAll(this._inputSelector));
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.name}-error`
    );
    errorElement.textContent = errorMessage;
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.name}-error`
    );
    errorElement.textContent = "";
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.setAttribute("disabled", "");
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.removeAttribute("disabled");
    }
  }

  // displaying error classes and messages
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      inputElement.classList.add(this._inputErrorClass);
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      inputElement.classList.remove(this._inputErrorClass);
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  _setEventListeners() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    this._formElement.addEventListener("reset", (evt) => {
      this._toggleButtonState();
      this._inputList.forEach((inputElement) => {
        inputElement.classList.remove(this._inputErrorClass);
        this._hideInputError(inputElement);
      });
    });

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", (evt) => {
        this._checkInputValidity(evt.target);
        this._toggleButtonState();
      });

      inputElement.addEventListener("change", (evt) => {
        this._checkInputValidity(evt.target);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}

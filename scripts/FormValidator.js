export class FormValidator {
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

  _toggleButtonState(inputList) {
    if (this._hasInvalidInput(inputList)) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.setAttribute("disabled", "");
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.removeAttribute("disabled");
    }
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      inputElement.classList.add(this._inputErrorClass);
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      inputElement.classList.remove(this._inputErrorClass);
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => !inputElement.validity.valid);
  }

  _setEventListeners() {
    const inputList = this._getInputList();

    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    this._formElement.addEventListener("reset", (evt) => {
      inputList.forEach((inputElement) => {
        inputElement.classList.remove(this._inputErrorClass);
        this._hideInputError(inputElement);
        this._toggleButtonState(inputList, this._submitButton);
      });
    });

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        // console.log(this._submitButton);
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, this._submitButton);
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}

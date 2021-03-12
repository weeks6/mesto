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
    this._submitButtonSelector = submitButtonSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputErrorClass = inputErrorClass;
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
    const buttonElement = this._getSubmitButton();
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.setAttribute("disabled", "");
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute("disabled");
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

  _getSubmitButton() {
    return this._formElement.querySelector(this._submitButtonSelector);
  }

  _getFormList() {
    return Array.from(document.querySelectorAll(this._formSelector));
  }

  _getInputList() {
    return Array.from(this._formElement.querySelectorAll(this._inputSelector));
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => !inputElement.validity.valid);
  }

  _setEventListeners() {
    const inputList = this._getInputList(this._formElement);
    const submitButton = this._getSubmitButton(this._formElement);

    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    this._formElement.addEventListener("reset", (evt) => {
      inputList.forEach((inputElement) => {
        inputElement.classList.remove(this._inputErrorClass);
        this._hideInputError(inputElement);
        this._toggleButtonState(inputList, submitButton);
      });
    });

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, submitButton);
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}

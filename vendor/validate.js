const enableValidation = (options) => {
  const formElement = document.querySelector(options.formSelector);

  formElement.addEventListener("submit", function (evt) {
    evt.preventDefault();
  });

  const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(
      `.${inputElement.name}-error`
    );
    errorElement.textContent = errorMessage;
  };

  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(
      `.${inputElement.name}-error`
    );
    errorElement.textContent = " ";
  };

  const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(options.inactiveButtonClass);
      buttonElement.setAttribute("disabled", "");
    } else {
      buttonElement.classList.remove(options.inactiveButtonClass);
      buttonElement.removeAttribute("disabled");
    }
  };

  const hasInvalidInput = (inputList) => {
    console.log();
    return inputList.some((inputElement) => !inputElement.validity.valid);
  };

  const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  };

  const setEventListeners = (formElement) => {
    const inputList = Array.from(
      formElement.querySelectorAll(options.inputSelector)
    );
    const buttonElement = formElement.querySelector(
      options.submitButtonSelector
    );

    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        checkInputValidity(formElement, inputElement);

        toggleButtonState(inputList, buttonElement);
      });
    });
  };

  setEventListeners(formElement);
};

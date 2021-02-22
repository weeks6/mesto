const enableValidation = (options) => {
  const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(
      `#${inputElement.name}-error`
    );
    errorElement.textContent = errorMessage;
  };

  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(
      `#${inputElement.name}-error`
    );
    errorElement.textContent = "";
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
      inputElement.classList.add(options.inputErrorClass);
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      inputElement.classList.remove(options.inputErrorClass);
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

    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    formElement.addEventListener("reset", (evt) => {
      inputList.forEach((inputElement) => {
        inputElement.classList.remove(options.inputErrorClass);
        hideInputError(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });

    // toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  };

  const formElements = Array.from(
    document.querySelectorAll(options.formSelector)
  );

  formElements.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

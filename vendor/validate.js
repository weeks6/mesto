const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const enableValidation = (config) => {
  const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(config.inactiveButtonClass);
    } else {
      buttonElement.classList.remove(config.inactiveButtonClass);
    }
  };

  const setEventListeners = (formElement) => {
    const inputList = Array.from(
      formElement.querySelectorAll(".form__text-field")
    );

    const buttonElement = formElement.querySelector(config.inactiveButtonClass);
    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      // isValid(formElement, inputElement);
    });
  };

  Array.from(document.querySelectorAll(config.formSelector)).forEach(
    (formElement) => {
      setEventListeners(formElement);
    }
  );
};

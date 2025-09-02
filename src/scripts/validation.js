export const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: ".modal__error"
}

/* to hide error medssage and red border */
const hideInputError = (formElement, inputElement, config) => {
  const errorMsgElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorMsgElement.textContent = "";
  inputElement.classList.remove(config.inputErrorClass);
}

/* to show error message and red border */
const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorMsgElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorMsgElement.textContent = errorMessage;
  inputElement.classList.add(config.inputErrorClass);

}

/* to check Validity of input and respond with show/hide error functions */
const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => !input.validity.valid );
};

const disableButton = (buttonElement, config) => {
  buttonElement.disabled = true;
  buttonElement.classList.add(config.inactiveButtonClass);
}

const enableButton = (buttonElement, config) => {
  buttonElement.disabled = false;
  buttonElement.classList.remove(config.inactiveButtonClass);
}

const resetValidation = (formElement, inputList, config) => {
  inputList.forEach((input) => {
    hideInputError(formElement, input, config);
  })
}

const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, config);
  } else {
    enableButton(buttonElement, config);
  }
}

/* to set Listeners for all inputs and change button states for checkInputValidity function */
const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config);

  formElement.addEventListener("reset", () => {
    disableButton(buttonElement, config);
  })

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    })
  })
};

/* To run all forms for SetEventListener function */
 const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector) ;
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
};

export { settings, enableValidation, resetValidation, disableButton };
const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible"
}

/* to hide error medssage and red border */
const hideInputError = (formElement, inputElement, settings) => {
  const errorMsgElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorMsgElement.textContent = "";
  inputElement.classList.remove(settings.inputErrorClass);
}

/* to show error message and red border */
const showInputError = (formElement, inputElement, errorMessage, settings) => {
  const errorMsgElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorMsgElement.textContent = errorMessage;
  inputElement.classList.add(settings.inputErrorClass);

}

/* to check Validity of input and respond with show/hide error functions */
const checkInputValidity = (formElement, inputElement, settings) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => !input.validity.valid );
};

const disableButton = (buttonElement, settings) => {
  buttonElement.disabled = true;
  buttonElement.classList.add(settings.inactiveButtonClass);
}

const enableButton = (buttonElement, settings) => {
  buttonElement.disabled = false;
  buttonElement.classList.remove(settings.inactiveButtonClass);
}

const resetValidation = (formElement, inputList) => {
  inputList.forEach((input) => {
    hideInputError(formElement, input, settings);
  })
}

const toggleButtonState = (inputList, buttonElement, settings) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, settings);
  } else {
    enableButton(buttonElement, settings);
  }
}

/* to set Listeners for all inputs and change button states for checkInputValidity function */
const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, settings);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement, settings);
    })
  })
};

/* To run all forms for SetEventListener function */
const enableValidation = (settings) => {
  const formList = document.querySelectorAll(settings.formSelector) ;
  formList.forEach((formElement) => {
    setEventListeners(formElement, settings);
  });
};

enableValidation(settings);
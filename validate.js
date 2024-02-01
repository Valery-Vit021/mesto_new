const initialsConfig = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__add-btn',
	inactiveButtonClass: 'popup__add-btn_disabled',
	inputErrorClass: 'popup__input_invalid',
	errorClass: 'popup__input-error_active',
}

function resetSppanError(form){
   const allInpout = form.querySelectorAll(initialsConfig.inputSelector); 
   allInpout.forEach((input) => {
      hideInputError(form, input);
   });
}

//ф-ия подсвечивает поле и показывает спан
const showInputError = (formElement, inputElement, errorMessage) => {
   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
   inputElement.classList.add(initialsConfig.inputErrorClass);
   errorElement.textContent = errorMessage;
   errorElement.classList.add(initialsConfig.errorClass);
}

//ф-ия убирает подсвечивание и спан
const hideInputError = (formElement, inputElement) => {
   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
   inputElement.classList.remove(initialsConfig.inputErrorClass);
   errorElement.classList.remove(initialsConfig.errorClass);
   errorElement.textContent ='';
}

//проверяем валидность 
const isValid = (formElement, inputElement) => {
   if(!inputElement.validity.valid){
      showInputError(formElement, inputElement, inputElement.validationMessage);
   }else{
      hideInputError(formElement, inputElement);
   }
}

const hasInvalidInput = (inputList) => {
   return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
   });
};

const toggleButtonState = (inputList, buttonElement) => {
   if (hasInvalidInput(inputList)){
      buttonElement.classList.add(initialsConfig.inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
   }else{
      buttonElement.classList.remove(initialsConfig.inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
   }
};

//ф-ия навешивает слу-ля на инпуты
const setEventListeners = (formElement) => {
   const inputList = Array.from(formElement.querySelectorAll(initialsConfig.inputSelector));
   const buttonElement = formElement.querySelector(initialsConfig.submitButtonSelector);
   toggleButtonState(inputList, buttonElement);
   inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
         isValid(formElement, inputElement);
         toggleButtonState(inputList, buttonElement);
      });
   });
};

//ф-ия навешивает 
const enableValidation = () => {
   const formList = Array.from(document.querySelectorAll(initialsConfig.formSelector));
   formList.forEach((formElement) => {
      setEventListeners(formElement);
   });
};

enableValidation();


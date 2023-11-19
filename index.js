let btnEdit = document.querySelector('.usercard__edit-btn');
let btnClosePopup = document.querySelector('.popup__close-btn');
let popup = document.querySelector('#edit-profile');
let nameUser = document.querySelector('.usercard__name-user');
let jobUser = document.querySelector('.usercard__about-me');
console.log(popup);

function openPopup() {
   popup.classList.add('popup__open');
}

function closePopup() {
   popup.classList.remove('popup__open');
   nameInput.value =  nameUser.textContent;
   jobInput.value = jobUser.textContent;
}

btnEdit.addEventListener('click', openPopup);
btnClosePopup.addEventListener('click', closePopup);

// Находим форму в DOM
let formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.popup__input_profile_name');
let jobInput = formElement.querySelector('.popup__input_profile_about');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
    evt.preventDefault(); 
    // Получите значение полей jobInput и nameInput из свойства value
   let valueNameInput = nameInput.value;
   let valueJobInput = jobInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
   nameUser.textContent = valueNameInput;
   jobUser.textContent = valueJobInput;
   closePopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);
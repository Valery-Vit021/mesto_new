//Кнопки
let btnEdit = document.querySelector('.usercard__edit-btn');
let btnClosePopupEdit = document.querySelector('.popup__close-edit-btn');
let btnClosePopupAdd = document.querySelector('.popup__close-add-btn')
let btnAdd = document.querySelector('.usercard__add-post-btn');
let btnClosePopupImg = document.querySelector('.popup__close-img-btn');
let btnClosePopupAvatar = document.querySelector('.popup__close-edit-avatar-btn')
const btnForm = document.querySelector('.popup__add-btn');

// Находим форму ред.профиля в DOM
let formEditUser = document.querySelector('form[name=edit-profile]');

// Находим форму доб.карточки в DOM
let formAddCard = document.querySelector('form[name=add-card-place]');

//Находим форму изменение аватарки в DOM
let formEditAvatar = document.querySelector('form[name=edit-avatar]');

//Инпуты
//Пользователь
let nameInput = formEditUser.querySelector('.popup__input_profile_name');
let jobInput = formEditUser.querySelector('.popup__input_profile_about');
//Место
let namePlace = document.querySelector('.popup__input_place_name');
let linkImgPlace = document.querySelector('.popup__input_place_link-imge');
//Аватар
let avatarImg = document.querySelector('.popup__input_avatar_link-imge');

//Popup`s
const popupEdit = document.querySelector('#edit-profile');
const popupAddCard = document.querySelector('#add-card-place');
const popupImg = document.querySelector('#add-img-place');
const popupAvatar = document.querySelector('#edit-avatar');

// Заголовки 
let nameUser = document.querySelector('.usercard__name-user');
let jobUser = document.querySelector('.usercard__about-me');

//Находим контейнер для карточек
let cardConteiner = document.querySelector('.usercard__content');

// Находим пустую карточку 
const hiddenCard = document.querySelector('.usercard__blank-card').content;


const avatar = document.querySelector('.usercard__avatar');

const initialCards = [
   {
     name: 'Архыз',
     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
   },
   {
     name: 'Челябинская область',
     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
   },
   {
     name: 'Иваново',
     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
   },
   {
     name: 'Камчатка',
     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
   },
   {
     name: 'Холмогорский район',
     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
   },
   {
     name: 'Байкал',
     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
   }
];

//открытие popup
function openPopup(popup) {
   popup.classList.add('popup__open');
   document.addEventListener('keydown', closePopupClickEsc);
   
};

//закрытие popup
function closePopup(popup) {
   popup.classList.remove('popup__open');
   document.removeEventListener('keydown', closePopupClickEsc);
};

//удаление карочки
const onClickDelete = evt => {
   const btnDeleteCard = evt.currentTarget;
   const deletingCard = btnDeleteCard.closest('.usercard__card');
   deletingCard.remove();
};

//уствновка/снятие лайка
const onClickLike = evt => {
   const btnLikeCard = evt.currentTarget;
   btnLikeCard.classList.toggle('usercard__like_active');
};

//просмотр изображения карточки
const onClickOpenImg = evt => {
   const clickImg = evt.currentTarget;
   const clickedImg = clickImg.closest('.usercard__card');
   const popupImg = document.querySelector('#add-img-place');
   popupImg.querySelector('.popup__img').src = clickedImg.querySelector('.usercard__card-img').src;
   popupImg.querySelector('.popup__name').textContent = clickedImg.textContent;
   popupImg.querySelector('.popup__img').alt = clickedImg.textContent;
   openPopup(popupImg);
}
// очистка формы
const formReset = (popup) => {
   const formElement = popup.querySelector('.popup__form');
   formElement.reset();
}

//вешаю слушатель на изображение карточки
popupImg.addEventListener('click', function (evt) { 
	if (evt.target === this) { 
		closePopup(popupImg)
   };
});

//вешаю слушатель на кнопку закрытия 
btnClosePopupImg.addEventListener('click', function(evt){
   closePopup(popupImg);   
});

//Вешаю слушатели на кнопки
//Кнопка Карандаш
btnEdit.addEventListener('click', function() {
   openPopup(popupEdit);
   nameInput.value = nameUser.textContent;
   jobInput.value = jobUser.textContent;
   resetSppanError(formEditUser);
   
});
//Кнопка крестик
btnClosePopupEdit.addEventListener('click', function(){
   closePopup(popupEdit);
});
//Кнопка плюс +
btnAdd.addEventListener('click', function(){
   openPopup(popupAddCard);
   resetSppanError(formAddCard);
   setEventListeners(formAddCard);
});
//Кнопка крестик 
btnClosePopupAdd.addEventListener('click', function(){
   closePopup(popupAddCard);
   formReset(popupAddCard);
});
//Кнопка крестик 
btnClosePopupAvatar.addEventListener('click', function(){
   closePopup(popupAvatar);
   formReset(popupAvatar);
});

avatar.addEventListener('click', function(){
   openPopup(popupAvatar);
   resetSppanError(formEditAvatar);
   setEventListeners(formEditAvatar);
});

//Закрытие popup`s на клик вне их

popupEdit.addEventListener('click', function(evt){
   if(evt.target === this){
      closePopup(popupEdit);
      formReset(popupEdit);
   }
});

popupAddCard.addEventListener('click', function(evt){
   if(evt.target === this){
      closePopup(popupAddCard);
      formReset(popupAddCard);
   }
});

popupAvatar.addEventListener('click', function(evt){
   if(evt.target === this){
      closePopup(popupAvatar);
      formReset(popupAvatar);
   }
});



//Закрытие popup`s на нажатие на esc

const closePopupClickEsc = evt => {
   const activePopup = document.querySelector('.popup__open');
   if(evt.key === 'Escape'){
      closePopup(activePopup);
      formReset(activePopup);
   }
};


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
   closePopup(popupEdit);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formEditUser.addEventListener('submit', handleFormSubmit);

//Создаем карты и добавлям в контейнер
function createCard(name, link){
   const clonedCard = hiddenCard.cloneNode(true);
   const nameCardElement = clonedCard.querySelector('.usercard__name-place');
   nameCardElement.textContent = name;
   const linkCardElement = clonedCard.querySelector('.usercard__card-img');
   linkCardElement.src = link;
   linkCardElement.alt = name;
   clonedCard.querySelector('.usercard__delete').addEventListener('click', onClickDelete);
   clonedCard.querySelector('.usercard__like').addEventListener('click', onClickLike);
   clonedCard.querySelector('.usercard__card-img').addEventListener('click', onClickOpenImg);
   return clonedCard;
};

function renderCard(card){
   const newCard = createCard( card.name, card.link);
   cardConteiner.prepend(newCard);
    
};
initialCards.forEach(card => {renderCard(card)});

function handleFormSubmitPlace (evt) {
   evt.preventDefault(); 

   const cardObject = {}
   cardObject.name = namePlace.value;
   cardObject.link = linkImgPlace.value;

   renderCard(cardObject);
  closePopup(popupAddCard);
  formAddCard.reset();
  
}

formAddCard.addEventListener('submit', handleFormSubmitPlace);

function handleFormSubmitAvatar (evt) {
   evt.preventDefault(); 

   let valueAvatarImg = avatarImg.value;
   
   avatar.style.backgroundImage = `url(${valueAvatarImg})`;
  closePopup(popupAvatar);
  formEditAvatar.reset();
}

formEditAvatar.addEventListener('submit', handleFormSubmitAvatar);


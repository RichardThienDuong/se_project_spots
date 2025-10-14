import Api from "../utils/api.js";
import { enableValidation, settings, resetValidation, disableButton } from "../scripts/validation.js";
import "./index.css";
import logo from "../images/Logo.svg";
import avatar from "../images/avatar.jpg";
import editIcon from "../images/edit-icon.svg";
import postIcon from "../images/post-icon.svg";
import avatarEditIcon from "../images/edit_profile_picture_pencil.svg";

document.getElementById('logo').src = logo;
document.getElementById('avatar').src = avatar;
document.getElementById('editIcon').src = editIcon;
document.getElementById('postIcon').src = postIcon;
document.getElementById('avatarEditIcon').src = avatarEditIcon;

const domSections = {
  avatarModal: document.querySelector('#avatar-modal'),
  profileModal: document.querySelector('#profile-modal'),
  pictureModal: document.querySelector('#picture-modal'),
  postModal: document.querySelector('#post-modal'),
  avatarForm: document.forms['avatar-form'],
  profileForm: document.forms['profile-form'],
  postForm: document.forms['post-form'],
  deleteModal: document.querySelector('#delete-modal')
}

const  domRefs = {
   cardTemplate: document.querySelector('#card-template'),
   cardsList: document.querySelector('.cards__section'),
   avatarModalOpenButton: document.querySelector('.profile__avatar-btn'),
   avatarModalCloseButton: domSections.avatarModal.querySelector('.modal__close-btn'),
   avatarPictureLink: domSections.avatarModal.querySelector('#picture-link'),
   avatarSubmitButton: domSections.avatarModal.querySelector('.modal__submit-btn'),
   profileEditOpenButton: document.querySelector('.profile__edit-btn'),
   profileCloseButton: domSections.profileModal.querySelector('.modal__close-btn'),
   profileName: document.querySelector('.profile__title'),
   profileDescription: document.querySelector('.profile__description'),
   profileInputName: document.querySelector('#profile_name'),
   profileInputDescription: document.querySelector('#profile_description'),
   profileSaveButton: domSections.profileModal.querySelector('.modal__submit-btn'),
   pictureModalImage: domSections.pictureModal.querySelector('.modal__preview-image'),
   pictureModalName: domSections.pictureModal.querySelector('.modal__preview-name'),
   pictureCloseButton: domSections.pictureModal.querySelector('.modal__close-btn'),
   postModalCloseButton: domSections.postModal.querySelector('.modal__close-btn'),
   postModalOpenButton: document.querySelector('.profile__post-btn'),
   postInputLink: domSections.postForm.querySelector('#post_link'),
   postInputName: domSections.postForm.querySelector('#post_name'),
   postSubmitButton: domSections.postForm.querySelector('.modal__submit-btn'),
   deleteCloseButton: domSections.deleteModal.querySelector('.modal__close-btn'),
   deleteDeleteButton: domSections.deleteModal.querySelector('.modal__delete-btn'),
   deleteCancelButton: domSections.deleteModal.querySelector('.modal__cancel-btn'),
};

// const initialCards = [
//   {
//       name: "Val Thorens",
//       link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
//   {
//       name: "Restaurant terrace",
//       link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
//   },
//   {
//       name: "An outdoor cafe",
//       link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
//   },
//   {
//       name: "A very long bridge, over the forest and through the trees",
//       link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
//   },
//   {
//       name: "Tunnel with morning light",
//       link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
//   },
//   {
//       name: "Mountain house",
//       link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
//   }
// ];

/* API Initialized */
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "09a1d4b7-51c4-44ff-b3ed-b4e5c25dcf7c",
    "Content-Type": "application/json",
  },
});

/* Cards  */
function getCardElement(data, domRefs, domSections) {
  const cardElement = domRefs.cardTemplate.content.querySelector('.card').cloneNode(true);
  const cardDescriptionEl = cardElement.querySelector('.card__description');
  const cardImageEl = cardElement.querySelector('.card__image');
  const cardLikeBtn = cardElement.querySelector('.card__like-btn');
  const cardDeleteBtn = cardElement.querySelector('.card__delete-btn');

  cardDescriptionEl.textContent = data.name;
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;

  cardLikeBtn.addEventListener('click', () => {
    cardLikeBtn.classList.toggle('card__like-btn_liked');
  })

  cardDeleteBtn.addEventListener('click', (evt) => {
    openDeleteModal(cardElement);
  })

  cardImageEl.addEventListener('click', () => {
    domRefs.pictureModalImage.src = cardImageEl.src;
    domRefs.pictureModalImage.alt = cardImageEl.alt;
    domRefs.pictureModalName.textContent = cardImageEl.alt;
    openModal(domSections.pictureModal);
  })

  return cardElement;
};

function renderCard(data, method = "append", domRefs, domSections) {
  const cardElement = getCardElement(data, domRefs, domSections);
  domRefs.cardsList[method](cardElement);
};


/* Functions : Opens, Closes, Submits,  */
function openModal(modal) {
  modal.classList.add('modal_opened');
  eventMgr.addEventListeners(eventMgr[modal.id]);
};
function closeModal(modal) {
  modal.classList.remove('modal_opened');
  eventMgr.removeEventListeners(eventMgr[modal.id]);
};

function openDeleteModal(cardElement){
  console.log('Open Delete Modal');
  domSections.deleteModal.classList.add('modal_opened');
  eventMgr.addEventListeners(eventMgr["delete-modal"]);
  domRefs.deleteDeleteButton.addEventListener('click', () => {
    handleDeleteButton(cardElement);
  });
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  api.editUserInfo({ name: domRefs.profileInputName.value, about: domRefs.profileInputDescription.value })
    .then((updatedUserData) => {
      console.log('Updated User Info: ', updatedUserData);
      domRefs.profileName.textContent = updatedUserData.name;
      domRefs.profileDescription.textContent = updatedUserData.about;
      closeModal(domSections.profileModal);
    })
    .catch((err) => { console.error(`Error: ${err}`); });
};

function handlePostFormSubmit(evt) {
  evt.preventDefault();
  const inputValues = {
    link: domRefs.postInputLink.value,
    name: domRefs.postInputName.value,
  };
  renderCard(inputValues, "prepend", domRefs, domSections);
  disableButton(domRefs.postSubmitButton, settings);
  domSections.postForm.reset();
  closeModal(domSections.postModal);
};

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  api.editAvatarInfo({ avatar: domRefs.avatarPictureLink.value })
    .then((avatarData) => {
      console.log('Avatar Info: ', avatarData); ///////////////
      document.getElementById('avatar').src = domRefs.avatarPictureLink.value;
      domRefs.avatarPictureLink.value = '';
      closeModal(domSections.avatarModal);
    })
    .catch((err) => { console.error(`Error: ${err}`); });
};

function handleCloseButton(evt) {
  const popupModal = evt.target.closest(".modal");
  if (popupModal.classList.contains('modal_opened')) {
    closeModal(popupModal);
  }
  }

function handleClickClose(evt) {
  if (evt.target.classList.contains('modal_opened')) {
    closeModal(evt.target);
  }
};

function handleCloseKey(evt) {
  const popupModal = document.querySelector('.modal_opened');
  if (evt.key === 'Escape') {
    closeModal(popupModal);
  }
};

function handleDeleteButton(cardToDelete) {
  // const cardId = cardToDelete.id;
  // api.deleteCard();
  cardToDelete.remove();
  closeModal(domSections.deleteModal);
  domRefs.deleteDeleteButton.removeEventListener('click', handleDeleteButton);
};


/* Event Manager for open/close Listeners */
const eventMgr = {
  "avatar-modal": [
    [handleAvatarFormSubmit, 'submit', domSections.avatarForm],
    [handleCloseButton, 'click', domRefs.avatarModalCloseButton],
    [handleClickClose, 'click', domSections.avatarModal],
    [handleCloseKey, 'keydown', document]
  ],
  "profile-modal": [
    [handleProfileFormSubmit, 'submit', domSections.profileForm],
    [handleCloseButton, 'click', domRefs.profileCloseButton],
    [handleClickClose, 'click', domSections.profileModal],
    [handleCloseKey, 'keydown', document]
  ],
  "post-modal": [
    [handlePostFormSubmit, 'submit', domSections.postForm],
    [handleCloseButton, 'click', domRefs.postModalCloseButton],
    [handleClickClose, 'click', domSections.postModal],
    [handleCloseKey, 'keydown', document]
  ],
  "picture-modal": [
    [handleCloseButton, 'click', domRefs.pictureCloseButton],
    [handleClickClose, 'click', domSections.pictureModal],
    [handleCloseKey, 'keydown', document]
  ],
  "delete-modal": [
    [handleCloseButton, 'click', domRefs.deleteCloseButton],
    [handleCloseButton, 'click', domRefs.deleteCancelButton],
  ],
  addEventListeners(listeners) {
    listeners.forEach(([handler, eventType, element]) => {
      element.addEventListener(eventType, handler);
    })
  },
  removeEventListeners(listeners) {
    listeners.forEach(([handler, eventType, element]) => {
      element.removeEventListener(eventType, handler);
    })
  }
};

/* Initial Data Fetch */
api.getAppInfo()
  .then(([cards, user]) => {
    console.log('Cards: ', cards); ////////////////
    console.log('User: ', user); //////////////
    
    cards.forEach((card) => {
        renderCard(card, undefined, domRefs, domSections);
    });
  })
  .catch((err) => { console.error(`Error: ${err}`); });


/* Main Page Listeners  */
domRefs.postModalOpenButton.addEventListener('click', () => {
  openModal(domSections.postModal);
});

domRefs.profileEditOpenButton.addEventListener('click', () => {
  domRefs.profileInputName.value = domRefs.profileName.textContent;
  domRefs.profileInputDescription.value = domRefs.profileDescription.textContent;

  resetValidation(domSections.profileModal, [domRefs.profileInputName, domRefs.profileInputDescription], settings);
  openModal(domSections.profileModal);
});

domRefs.avatarModalOpenButton.addEventListener('click', () => {
  openModal(domSections.avatarModal);
});

enableValidation(settings);
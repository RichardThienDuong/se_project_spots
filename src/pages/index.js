import Api from "../utils/api.js";
import { enableValidation, settings, resetValidation, disableButton } from "../scripts/validation.js";
import "./index.css";
import { handleSubmit } from "../utils/utils.js";
import logo from "../images/Logo.svg";
import editIcon from "../images/edit-icon.svg";
import postIcon from "../images/post-icon.svg";
import avatarEditIcon from "../images/edit_profile_picture_pencil.svg";

document.getElementById('logo').src = logo;
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
  if (data.isLiked) {
    cardLikeBtn.classList.toggle('card__like-btn_liked')
  }

  cardLikeBtn.addEventListener('click', (evt) => {
    handleLikeButton(evt, data._id);
  })

  cardDeleteBtn.addEventListener('click', () => {
    openDeleteModal(cardElement, data._id);
  })

  cardImageEl.addEventListener('click', () => {
    domRefs.pictureModalImage.src = cardImageEl.src;
    domRefs.pictureModalImage.alt = cardImageEl.alt;
    domRefs.pictureModalName.textContent = cardImageEl.alt;
    openModal(domSections.pictureModal);
  })

  return cardElement;
};

let selectedCard, selectedCardId;

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

function openDeleteModal(cardElement, cardId){
  domSections.deleteModal.classList.add('modal_opened');
  eventMgr.addEventListeners(eventMgr["delete-modal"]);
  domRefs.deleteDeleteButton.addEventListener('click', (evt) => {
    handleDeleteButton(cardElement, cardId, evt);
  });
}

function handleProfileFormSubmit(evt) {
  function makeRequest() {
    return api.editUserInfo({ name: domRefs.profileInputName.value, about: domRefs.profileInputDescription.value })
              .then((updatedUserData) => {
                domRefs.profileName.textContent = updatedUserData.name;
                domRefs.profileDescription.textContent = updatedUserData.about;
                closeModal(domSections.profileModal);
              });
  }
  handleSubmit(makeRequest, evt, 'Saving...');
};

function handlePostFormSubmit(evt) {
  function makeRequest() {
    return api.addCard({ name: domRefs.postInputName.value, link: domRefs.postInputLink.value })
      .then((newCard) => {
        renderCard(newCard, "prepend", domRefs, domSections);
        disableButton(domRefs.postSubmitButton, settings);
        domSections.postForm.reset();
        closeModal(domSections.postModal);
      });
  }
  handleSubmit(makeRequest, evt, 'Saving...');
};

function handleAvatarFormSubmit(evt) {
  function makeRequest() {
    return api.editAvatarInfo({ avatar: domRefs.avatarPictureLink.value })
      .then((avatarData) => {
        document.getElementById('avatar').src = avatarData.avatar;
        domRefs.avatarPictureLink.value = '';
        closeModal(domSections.avatarModal);
      });
  }
  handleSubmit(makeRequest, evt, 'Saving...');
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

function handleDeleteButton(cardElement, cardId, evt) {
  selectedCard = cardElement;
  selectedCardId = cardId;
  function makeRequest() {
    return api.deleteCard(cardId)
      .then(() => {
        cardElement.remove();
        closeModal(domSections.deleteModal);
        domRefs.deleteDeleteButton.removeEventListener('click', handleDeleteButton);
      });
  }
  handleSubmit(makeRequest, evt, 'Deleting...');
};

function handleLikeButton(evt, cardId) {
  if (evt.target.classList.contains('card__like-btn_liked')){
    api.handleLike(cardId, true)
      .then(() => {
        evt.target.classList.toggle('card__like-btn_liked');
      })
      .catch((err) => { console.error(`Error: ${err}`); });
  } else {
    api.handleLike(cardId, false)
      .then(() => {
        evt.target.classList.toggle('card__like-btn_liked');
      })
      .catch((err) => { console.error(`Error: ${err}`); });
  }
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
    [handleClickClose, 'click', domSections.deleteModal],
    [handleCloseKey, 'keydown', document]
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
    document.getElementById('avatar').src = user.avatar;
    domRefs.profileName.textContent = user.name;
    domRefs.profileDescription.textContent = user.about;
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
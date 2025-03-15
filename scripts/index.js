const initialCards = [
  {
      name: "Val Thorens",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
      name: "Restaurant terrace",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
      name: "An outdoor cafe",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
      name: "A very long bridge, over the forest and through the trees",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
      name: "Tunnel with morning light",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
      name: "Mountain house",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  }
];

const domSections = {
  profileModal: document.querySelector('#profile-modal'),
  pictureModal: document.querySelector('#picture-modal'),
  postModal: document.querySelector('#post-modal'),
  profileForm: document.forms['profile-form'],
  postForm: document.forms['post-form'],
}

const  domRefs = {
   cardTemplate: document.querySelector('#card-template'),
   cardsList: document.querySelector('.cards__section'),
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
   postSubmitButton: domSections.postForm.querySelector('.modal__submit-btn')
};

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

  cardDeleteBtn.addEventListener('click', () => {
    cardElement.remove();
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
}

initialCards.forEach((data) => {
  renderCard(data, undefined, domRefs, domSections);
});


/* Modals / Forms  */
function openModal(modal) {
  modal.classList.add('modal_opened');
  eventMgr.addEventListeners(eventMgr[modal.id]);
};
function closeModal(modal) {
  modal.classList.remove('modal_opened');
  eventMgr.removeEventListeners(eventMgr[modal.id]);
};

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  domRefs.profileName.textContent = domRefs.profileInputName.value;
  domRefs.profileDescription.textContent = domRefs.profileInputDescription.value;
  closeModal(domSections.profileModal);
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
}

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
}

function handleCloseKey(evt) {
  const popupModal = document.querySelector('.modal_opened');
  if (evt.key === 'Escape') {
    closeModal(popupModal);
  }
}

const eventMgr = {
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
}

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
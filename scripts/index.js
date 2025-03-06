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

/* Card Template */
const cardTemplate = document.querySelector('#card-template');
const cardsList = document.querySelector('.cards__section');

/* Edit Profile Open/Close */
const profileModal = document.querySelector('#profile-modal');
const profileEditButton = document.querySelector('.profile__edit-btn');
const profileCloseButton = document.querySelector('.modal__close-btn');

/* Edit Profile Name/Description */
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileInputName = document.querySelector('#profile_name');
const profileInputDescription = document.querySelector('#profile_description');

/* Edit Profile Form + Save Button*/
const profileForm = document.forms['profile-form'];
const profileSaveButton = document.querySelector('.modal__submit-btn');

/* Picture Modal */
const pictureModal = document.querySelector('#picture-modal');
const pictureModalImage = pictureModal.querySelector('.modal__preview_image');
const pictureModalName = pictureModal.querySelector('.modal__preview_name');

/* Card functions and Card Listeners */
function getCardElement(data) {
  const cardElement = cardTemplate.content.querySelector('.card').cloneNode(true);
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
    pictureModalImage.src = cardImageEl.src;
    pictureModalImage.alt = cardImageEl.alt;
    pictureModalName.textContent = cardImageEl.alt;
    openModal(pictureModal);
  })

  return cardElement;
};

function renderCard(data, method = "append") {
  const cardElement = getCardElement(data);
  cardsList[method](cardElement);
}

initialCards.forEach((data) => {
  renderCard(data);
});

/* Open Edit Profile && Update inputs / Close Edit Profile */
function openModal(modal) { modal.classList.add('modal_opened'); };
function closeModal(modal) { modal.classList.remove('modal_opened'); };

/* Save Edit Profile */
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileInputName.value;
  profileDescription.textContent = profileInputDescription.value;
  closeModal(profileModal);
};

/* New Post Selectors */
const postModal = document.querySelector('#post-modal');
const postModalCloseButton = postModal.querySelector('.modal__close-btn');
const postModalOpenButton = document.querySelector('.profile__post-btn');

/* New Post Form */
const postForm = document.forms['post-form'];
const postInputLink = postForm.querySelector('#post_link');
const postInputName = postForm.querySelector('#post_name');
const postSubmitButton = postForm.querySelector('.modal__submit-btn');

/* Save New Post */
function handlePostFormSubmit(evt) {
  evt.preventDefault();
  const inputValues = {
    link: postInputLink.value,
    name: postInputName.value,
  };
  cardsList.prepend(getCardElement(inputValues));
  closeModal(postModal);
  postForm.reset();
};

/* Event Listeners: Edit Profile, New Post */
profileEditButton.addEventListener('click', () => {
  profileInputName.value = profileName.textContent;
  profileInputDescription.value = profileDescription.textContent;
  openModal(profileModal);
});
profileCloseButton.addEventListener('click', () => {
  closeModal(profileModal);
});
profileForm.addEventListener('submit', handleProfileFormSubmit);

postModalOpenButton.addEventListener('click', () => {
  openModal(postModal);
});

const closeButtons = document.querySelectorAll('.modal__close-btn');
closeButtons.forEach((button) => {
  const popupModal = button.closest('.modal');
  button.addEventListener('click', () => {
    closeModal(popupModal);
  });
});
postModalCloseButton.addEventListener('click', () => {
  closeModal(postModal);
});
postForm.addEventListener('submit', handlePostFormSubmit);

pictureModal.addEventListener('click', () => {
  closeModal(pictureModal);
});

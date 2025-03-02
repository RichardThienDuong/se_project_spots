/* Edit Profile Open/Close */
const profileModal = document.querySelector('.modal');
const profileEditButton = document.querySelector('.profile__edit-btn');
const profileCloseButton = document.querySelector('.modal__close-btn');

/* Edit Profile Name/Description */
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileInputName = document.querySelector('#profile_name');
const profileInputDescription = document.querySelector('#profile_description');

/* Edit Profile Form + Save Button*/
const profileForm = document.querySelector('.modal__form');
const profileSaveButton = document.querySelector('.modal__submit-btn');

/* Open Edit Profile && Update inputs / Close Edit Profile */
function modalOpen() {
  profileInputName.value = profileName.textContent;
  profileInputDescription.value = profileDescription.textContent;
  profileModal.classList.add('modal_opened');
};
function modalClose() { profileModal.classList.remove('modal_opened'); };

/* Save Edit Profile */
function modalSave(evt) {
  evt.preventDefault();
  profileName.textContent = profileInputName.value;
  profileDescription.textContent = profileInputDescription.value;
  modalClose();
};

/* Card Template */
const cardTemplate = document.querySelector('#card-template');
const cardsList = document.querySelector('.cards');
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

function getCardElement(data) {
  const cardElement = cardTemplate.content.querySelector('.card').cloneNode(true);
  const cardDescriptionEl = cardElement.querySelector('.card__description');
  const cardImageEl = cardElement.querySelector('.card__image');

  cardDescriptionEl.textContent = data.name;
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;

  return cardElement;
};

for (let i = 0; i < initialCards.length; i++) {
  const cardElement = getCardElement(initialCards[i]);
  cardsList.append(cardElement);
}

profileEditButton.addEventListener('click', modalOpen); // Edit Profile Open Button
profileCloseButton.addEventListener('click', modalClose); // Edit Profile Close Button
profileForm.addEventListener('submit', modalSave); // Edit Profile Save Button


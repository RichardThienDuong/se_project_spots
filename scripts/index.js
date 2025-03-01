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

 /* Edit Profile */
 let profileModal = document.querySelector('.modal');
 let profileEditButton = document.querySelector('.profile__edit-btn');
let profileCloseButton = document.querySelector('.modal__close-btn');

function modalOpen() {
  profileModal.classList.add('modal_opened');
}

function modalClose() {
  profileModal.classList.remove('modal_opened');
}

profileEditButton.addEventListener('click', modalOpen);

profileCloseButton.addEventListener('click', modalClose);
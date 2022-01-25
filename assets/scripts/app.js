const addMovieBtn = document.querySelector("header button");
const addModal = document.getElementById("add-modal");
const deleteModal = document.getElementById("delete-modal");
const backdrop = document.getElementById("backdrop");
const cancelBtns = document.querySelectorAll(".btn--passive");
// const confirmCancelBtn = document.querySelector(".modal__actions .btn--passive");
const confirmDeleteBtn = document.querySelector(".modal__actions .btn--danger");
const confirmAddMovie = document.querySelector(".btn--success");
const inputFields = document.querySelectorAll("input");
const movieList = [];
const headerUI = document.getElementById("entry-text");
const listRoot = document.getElementById("movie-list");
const confirmCancelBtn = cancelBtns[1];
const confirmCancelAdd = cancelBtns[0];

document.onclick = (event) => {
  switch (event.target) {
    case addMovieBtn:
      addMovieModal(addModal);
      backdropOverlay();
      clearMovieInputs();
      break;
    case confirmCancelBtn:
      backdropOverlay();
      deleteMoviemodal(deleteModal);
      break;
    case backdrop:
    case confirmCancelAdd:
      backdropOverlay();
      clearMovieInputs();
      deleteMoviemodal(addModal);
      deleteMoviemodal(deleteModal);
      break;
    case confirmAddMovie:
      validateUserInputs();
      clearMovieInputs();
      updateUI();

    default:
      return;
  }
};

let backdropOverlay = () => backdrop.classList.toggle("visible");
let addMovieModal = (modal) => modal.classList.add("visible");
let deleteMoviemodal = (modal) => modal.classList.remove('visible');

function validateUserInputs() {
  let titleInput = inputFields[0].value;
  let imageInput = inputFields[1].value;
  let ratingInput = inputFields[2].value;

  if (
    titleInput === "" ||
    imageInput === "" ||
    ratingInput === "" ||
    +ratingInput < 1 ||
    +ratingInput > 5
  ) {
    alert("One of the inputs is wrong");
    return;
  }

  const newMovie = {
    title: titleInput,
    image: imageInput,
    rating: ratingInput,
  };

  movieList.push(newMovie);
  backdropOverlay();
  deleteMoviemodal(addModal);
  renderMovieList(newMovie);
}

const clearMovieInputs = () => {
  for (let usrInput of inputFields) usrInput.value = "";
};

const updateUI = () => {
  if (movieList.length == 0) {
    headerUI.style.display = "block";
  } else {
    headerUI.style.display = "none";
  }
};


const renderMovieList = (movieObject) => {
  const { title, image, rating } = movieObject;
  const newMovieElement = document.createElement("li");
  newMovieElement.className = "movie-element";
  newMovieElement.innerHTML = `
        <div class="movie-element__image">
            <img src="${image}" alt="${title}">
        </div>
        <div class="movie-element__info">
            <h2>${title}</h2>
            <p>${rating}/5 stars</p>
        </div>
    `;

  newMovieElement.addEventListener('click', () => {
    confirmDelete();
    confirmDeleteBtn.onclick = () => {
      for (let i = 0; i < movieList.length; i++) {
        if (movieList[i].title === title){
          movieList.splice(i, 1);
          break;
        }
      }
      newMovieElement.parentElement.removeChild(newMovieElement);
      deleteMoviemodal(deleteModal);
      backdropOverlay();
      updateUI();
    }
  });
  listRoot.append(newMovieElement);
};

 const confirmDelete = () => {
   deleteModal.classList.add('visible');
   backdropOverlay();
 } 

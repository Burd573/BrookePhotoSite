"use strict";

/***************Expanding Cards*****************/

//Select all panels and add active class when mouseover event occurs.
const panels = document.querySelectorAll(".panel");
panels.forEach((panel) => {
  panel.addEventListener("mouseover", () => {
    removeActiveClasses();
    panel.classList.add("active");
  });
});

//Remove the active class from each panel
function removeActiveClasses() {
  panels.forEach((panel) => {
    panel.classList.remove("active");
  });
}

/***************Navbar*****************/

//Get The navbar elements from the DOM
const nav = document.querySelector(".nav_links");
const burger = document.querySelector(".burger");

//Add the active class to the navbar when the user scrolls
function fixNav() {
  if (nav.classList.length < 3) {
    if (window.scrollY > nav.offsetHeight + 25) {
      nav.classList.add("active");
    } else {
      nav.classList.remove("active");
    }
  }
}

//Add the nav-active class to the nav class when the burger is clicked on
const navSlide = () => {
  burger.addEventListener("click", () => {
    nav.classList.toggle("nav-active");
  });
};

window.addEventListener("scroll", fixNav);
navSlide();

/***************Portfolio Image Click****************/

//Get the necessary portfolio elements from the DOM
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const port_imgs = document.querySelectorAll(".port_img");

//Remove the "selected" id from the element
function removeImgSelected() {
  let toRemove = document.getElementById("selected");
  modal.removeChild(toRemove);
}

//Remove the "hidden" class from the modal and the overlay
const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

//Add the hidden class back to the modal and the overlay and remove the "selected" id from the element
const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  removeImgSelected();
};

//Listen for a click on one of the images. If it is clicked set an id of "selected" on a copy of the image, and blur the background through the modal class
for (let i = 0; i < port_imgs.length; i++) {
  port_imgs[i].addEventListener("click", () => {
    let selected = port_imgs[i];
    let toAdd = selected.cloneNode(true);
    toAdd.setAttribute("id", "selected");
    modal.appendChild(toAdd);
    openModal();
  });
}

//When the image is closed by either pressing the "close" button or clicking off of the image, close the blur effect and remove the "selected" id from the image
if (btnCloseModal != null) {
  btnCloseModal.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);
}

//Listen for the user to hit the "escape" key and close the image view when it happens
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

/***************Lazy Loading (Not Currently Working)*****************/

// const lazyImgs = document.querySelectorAll("img[data-src]");
// const loadImg = function (entries, observer) {
//   const [entry] = entries;
//   if (!entry.isIntersecting) {
//     return;
//   }
//   entry.target.src = entry.target.dataset.src;
//   entry.target.addEventListener("load", function () {
//     entry.target.classList.remove("lazy");
//   });
//   observer.unobserve(entry.target);
// };

// const imgObserver = new IntersectionObserver(loadImg, {
//   root: null,
//   threshold: 0,
// });

// lazyImgs.forEach((img) => {
//   imgObserver.observe(img);
// });

/***************About Slideshow*****************/

var slideIndex = 0;
showSlides();

/* These two slideshows are redundant - could have single function with parameters but ran short on time...Will do later */

//Create the slideshow by looping through the images and changing the display
function showSlides() {
  var aboutSlides = document.getElementsByClassName("img_slide");

  for (let i = 0; i < aboutSlides.length; i++) {
    aboutSlides[i].style.display = "none";
  }

  if (slideIndex > aboutSlides.length - 1) {
    slideIndex = 0;
  }
  slideIndex++;

  if (aboutSlides.length > 0) {
    aboutSlides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 4000);
  }
}

/***************Main Page Slideshow*****************/

var mainSlideIndex = 0;
showMainSlides();

//Create the slideshow by looping through the images and changing the display
function showMainSlides() {
  var mainSlides = document.getElementsByClassName("main_img_slide");

  for (let i = 0; i < mainSlides.length; i++) {
    mainSlides[i].style.display = "none";
  }

  if (mainSlideIndex > mainSlides.length - 1) {
    mainSlideIndex = 0;
  }
  mainSlideIndex++;

  if (mainSlides.length > 0) {
    mainSlides[mainSlideIndex - 1].style.display = "block";
    setTimeout(showMainSlides, 4000);
  }
}

/***************Contact Form Email*****************/

//Get the necessary portfolio elements from the DOM
const contactForm = document.getElementById("contact");
const nameInput = contactForm.elements["nameInput"];
const phoneInput = contactForm.elements["phoneInput"];
const emailInput = contactForm.elements["emailInput"];
const interestInput = contactForm.elements["interestInput"];
const commentsInput = contactForm.elements["commentsInput"];

//Listen for the sumbit button and take the information in the form and put it an an email that will be sent through the user's mail client
contactForm.addEventListener("submit", () => {
  var body =
    "Hello my name is " +
    nameInput.value +
    " and I am interested in " +
    interestInput.value +
    ". You can reach me at " +
    phoneInput.value +
    " or through my email at " +
    emailInput.value +
    ". \n\n" +
    commentsInput.value;
  window.open("mailto:burd573@gmail.com?subject=Photography&body=" + body);
});

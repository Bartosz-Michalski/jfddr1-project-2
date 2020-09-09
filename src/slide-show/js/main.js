// VARIABLES AND CONSTANTS

let currentSlideNumber = 0;
const images = [];
const time = 2000;
const slide = document.querySelector(".slide");

// IMAGE LIST

images[0] = "img/img1.jpeg";
images[1] = "img/img2.jpeg";
images[2] = "img/img3.jpeg";
images[3] = "img/img4.jpeg";
images[4] = "img/img5.jpeg";
images[5] = "img/img6.jpeg";

// CHANGE IMAGE

function changeImages() {
  slide.src = images[currentSlideNumber];

  if (currentSlideNumber < images.length - 1) {
    currentSlideNumber++;
  } else {
    currentSlideNumber = 0;
  }
  setTimeout("changeImages()", time);
}

changeImages();

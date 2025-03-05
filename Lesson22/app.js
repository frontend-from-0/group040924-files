// Container to hold 3 images and buttons (next / prev)
// Use display none / hidden to hide 2 images and only show one
// Add click event listeners for next / prev buttons
// Active - for the active image, hidden for hidden images

let currentImageIndex = 0;
const images = document.querySelectorAll(".carousel img");
const imageArrayLength = images.length;
const indexOfLastElementInImageArray = imageArrayLength - 1;
console.log(
  "Index of the last image in the image array",
  indexOfLastElementInImageArray,
);

document.getElementById("next-btn").addEventListener("click", function () {
  console.log("Current image index", currentImageIndex);
  if (currentImageIndex >= indexOfLastElementInImageArray) {
    console.log(
      "Current image index is >= than indexOfLastElementInImageArray. Setting currentImageIndex to 0.",
    );
    currentImageIndex = 0;
  } else {
    console.log(
      "Current image index is < than indexOfLastElementInImageArray. Setting currentImageIndex to +1",
    );
    currentImageIndex++;
  }

  for (let i = 0; i < imageArrayLength; i++) {
    console.log(`Removing active class from the ${i} element in image array`);
    images[i].classList.remove("active");
    indicators[i].classList.remove("active");
  }

  console.log(
    `Add active class to the ${currentImageIndex} element in image array`,
  );
  images[currentImageIndex].classList.add("active");
  indicators[currentImageIndex].classList.add("active");
});

const indicators = document.querySelectorAll(".indicator");

document.getElementById("prev-btn").addEventListener("click", function () {
  if (currentImageIndex <= 0) {
    currentImageIndex = indexOfLastElementInImageArray;
  } else {
    currentImageIndex--;
  }

  for (let i = 0; i < imageArrayLength; i++) {
    console.log(`Removing active class from the ${i} element in image array`);
    images[i].classList.remove("active");
    indicators[i].classList.remove("active");
  }

  console.log(
    `Add active class to the ${currentImageIndex} element in image array`,
  );
  images[currentImageIndex].classList.add("active");
  indicators[currentImageIndex].classList.add("active");
});

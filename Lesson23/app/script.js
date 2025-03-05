const BASE_URL = "https://api.unsplash.com";

function fetchImages () {
  fetch(BASE_URL + "/photos/random/" + `?client_id=${ACCESS_KEY}&count=10`)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`Request failed! ${response.status}, ${response.statusText}`);
    })
  .then((data) => {
    for (let i = 0; i < data.length; i++) {
      addImagesToPage(data[i].urls.small, data[i].alt_description);
    }
  })
  .catch((error) => console.log(error));
}

function addImagesToPage(src, alt) {
  const newImage = document.createElement("img");
  newImage.src=src;
  newImage.alt=alt;
  console.log(newImage);
  document.getElementById("image-container").appendChild(newImage);
}


  const button = document.getElementById("fetch-button");

  button.addEventListener('click', () => fetchImages());

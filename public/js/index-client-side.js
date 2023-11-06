// import Axios
// import axios from 'axios'; // * if using script tag to load axios, no need to use import


// fadeOut effect 
function fadeOut(element, callback) {
  // set the opacity of the element to 1
  element.style.opacity = 1;

  // define the animation
  var fadeAnimation = element.animate([
    { opacity: 1 },
    { opacity: 0 }
  ], {
    duration: 1000, // animation duration in milliseconds
  });

  //when the animation finishes, hide the element
  fadeAnimation.onfinish = function() {
    if(callback){ 
      callback(); // ensure that animation finish before executing the cb function
    }
    element.style.display = 'none';
  }
}

// * display photos infos from API
function getPhotos(){

  // retrieve data from API
  axios.get('https://jsonplaceholder.typicode.com/albums/2/photos')
  .then(response => {

  // handle response data
  const data = response.data;

  // update the index page with the data
  const container = document.querySelector('#data-photos-container');
  container.innerHTML = ''; // clear the content of the container

  let photoCount = data.length; // get the number of object from API

  // create onclick event listener to remove image (fadeout effect)
  function removeImage(element, item) {
    let isClicked = false;
    element.addEventListener('click', function() {
      if (!isClicked) {
        isClicked = true; // prevent the event listener from running again after first click
        fadeOut(element, function() { // * fadeOut act on element -> then inline-cb function process
          console.log('Photo clicked:', item);
          element.remove();
          photoCount--;
          countPhotos.textContent = "Number of Photos : " + photoCount;
        });
      }
    });
  }


  // * browse each object from API 
  data.forEach(item => {

    // * add image + image-infos to the DOM
    const element = document.createElement('div'); // create a container for the image and it's title
    const img = document.createElement('img'); // create a img element for the image
    const title = document.createElement('p'); // create a p element for the title
  
    img.src = item.url; // set the image url
    img.alt = item.title; // set the title to alt text
    title.textContent = item.title; // set the title

    element.appendChild(img); // add img to element div
    element.appendChild(title); // add title (p element) to element div
    container.appendChild(element); // add the div element to the container (page)

    // * remove image from DOM (only if user do onclik)
    removeImage(element, item); // add an onclick event listener to each image (element)

  });

  // * display the number of photos
  console.log("Number of photos : " + photoCount);
  let countPhotos = document.createElement('p');
  countPhotos.textContent = "Number of Photos : " + photoCount;
  container.appendChild(countPhotos);
})
.catch(error => {
  // handle error
  console.error(error);
});

}

getPhotos(); // call the getPhotos functions to display photos from API to the DOM



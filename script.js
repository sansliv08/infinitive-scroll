const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let initialLoad = true;

// Unsplash API
let count = 5;
const apiKey = 'SL5HNM9cI3MW0-6cppjdhK7DiyYJKi0--z6H5Dgv2y4'; // I get from unsplash count
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
    // console.log('image loaded');
    imagesLoaded++;
    console.log(imagesLoaded);
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        // initialLoad = false;
        count = 30;
        apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
        console.log('ready = ', ready);
    };
};

//Helper Function to Set Attributtes on Dom Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
};

// Create Elements for Links & Photos, add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('totalImages = ', totalImages);
    //Run function for each object in photosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to unsplash
        const item = document.createElement('a');
        // Old way with repetitive set attribute
            // item.setAttribute('href', photo.links.html);
            // item.setAttribute('target', '_blanck');

        // Call function to set attributes
        setAttributes(item, {
            href: photo.links.html,
            target: '_blanck',
        });

        // Create <img> for photo
        const img = document.createElement('img');
        // Old way with repetitive set attribute
            // img.setAttribute('src', photo.urls.regular);
            // img.setAttribute('alt', photo.alt_description);
            // img.setAttribute('title', photo.alt_description);

        // Call function to set attributes
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);

        // Put <img> inside <a>, then put botb inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
};

// Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        // Catch error here
    };
};

// Check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', () => {
    // console.log('scrolled');
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        // console.log('window.innerHeight: ', window.innerHeight);
        // console.log('window.scrollY: ', window.scrollY);
        // console.log('window.innerHeight + window.scrollY: ', window.innerHeight + window.scrollY);
        // console.log('document.body.offsetHeight - 1000: ', document.body.offsetHeight - 1000);
        ready = false;
        getPhotos();
        console.log('load more');
    }
});

// On load
getPhotos();



const container = document.body;
const itemsWrapper = document.querySelector('.grid');
const loader = document.querySelector('.loading');

const preloadImages = () => {
    return new Promise((resolve, reject) => {
        imagesLoaded(document.querySelectorAll('img'), resolve);
        imagesLoaded(document.querySelectorAll('svg'), resolve);
    });
};

preloadImages().then(() => {

    // Init Hover FX
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    if (mediaQuery.matches) {
      const effect = new RGBShiftEffect(container, itemsWrapper, { strength: 0.55 })
    }

    setTimeout(function() {

      // Remove the loader
      loader.style.display = "none";

    }, 3000);


});

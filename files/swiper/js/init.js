const lazyImages = document.querySelectorAll('img[loading="lazy"]'); // Get all images with the loading="lazy" attribute
function addLoadedClass(image) { // Function to add class to image parent after it is loaded
   const parentElement = image.parentElement;
   if (image.complete) { // Check if the image is loaded
      parentElement.classList.add('loaded');
   } else {
      image.addEventListener('load', function() { // Add a load event to add the class after the image has loaded
         parentElement.classList.add('loaded');
      });
   }
}
lazyImages.forEach(addLoadedClass); // Loop through all the images and call the addLoadedClass function for each one

/* === */

/* First screen slider -> */

const slideTitles = [];
document.querySelectorAll('.swiper-slide').forEach(slide => {
   slideTitles.push(slide.getAttribute('data-title'));
});

let fsSlider = document.getElementById('fs-slider');
if (fsSlider) {
   new Swiper(fsSlider, {
      autoHeight: false,
      slidesPerView: 1,
      slidesPerGroup: 1,
      watchOverflow: true,
      spaceBetween: 0,
      loop: true,
      /*autoplay: {
         delay: 6000,
         stopOnLastSlide: false,
         disableOnInteraction: false,
      },*/
      speed: 1500,
      effect: 'slide',
      preloadImages: false,
      lazy: {
         loadOnTransitionStart: false,
         loadPrewNext: false,
      },
      watchSlidesProgress: true,
      watchSlidesVisibility: true,
      pagination: {
         el: '#fs-slider-pagination',
         clickable: true,
         renderBullet: function (index, className) {
           return `<span class="${className}">${slideTitles[index]}</span>`;
         }
      },
      parallax: true,
   });
}

/* <- First screen slider */

/* Category slider -> */

let categorySlider = document.getElementById('category-slider');
if (categorySlider) {
   new Swiper(categorySlider, {
      navigation: {
         prevEl: '#category-btn-prev',
         nextEl: '#category-btn-next',
      },
      autoHeight: true,
      slidesPerView: 1,
      slidesPerGroup: 1,
      watchOverflow: true,
      spaceBetween: 50,
      loop: false,
      /*autoplay: {
         delay: 3000,
         stopOnLastSlide: false,
         disableOnInteraction: false,
      },*/
      speed: 1500,
      effect: 'slide',
      preloadImages: false,
      lazy: {
         loadOnTransitionStart: false,
         loadPrewNext: false,
      },
      watchSlidesProgress: true,
      watchSlidesVisibility: true,
   });
}

/* <- Category slider */

/* Product slider -> */
let productSlider = document.getElementById('product-slider');
if (productSlider) {
   // Галерея миниатюр справа
   var swiperGallery = new Swiper("#product-gallery", {
      spaceBetween: 4,
      slidesPerView: 3,
      slidesPerGroup: 1,
      loop: false,
      autoHeight: false,
      direction: 'horizontal',
      watchSlidesProgress: true,
      breakpoints: {
         576: {
            direction: 'vertical',
            spaceBetween: 25,
         }
      },
      navigation: {
         nextEl: "#product-slide-btn-next",
         prevEl: "#product-slide-btn-prev",
      },
      preloadImages: false, // Отключить предзагрузка картинок
      lazy: { // Lazy Loading (подгрузка картинок)
         loadOnTransitionStart: false, // Подгружать на старте переключения слайда
         loadPrewNext: false, // Подгрузить предыдущую и следующую картинку
      },
      watchSlidesProgress: true, // Слежка за видимыми слайдами
      watchSlidesVisibility: true, // Добавление класса видимым слайдам
   });

   // Большой слайдер слева
   var swiperMain = new Swiper(productSlider, {
      spaceBetween: 0,
      slidesPerView: 1,
      effect: 'fade',
      loop: false,
      fadeEffect: {
         crossFade: true
      },
      thumbs: {
         swiper: swiperGallery,
      },
      allowTouchMove: false, // <-- запрещаем перетаскивать мышью/пальцем
   });
}
/* <- Product slider */
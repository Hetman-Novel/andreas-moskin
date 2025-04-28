document.addEventListener('DOMContentLoaded', function() {
   const wrapBlock = document.querySelector('.wrap-block-with-currency-selection');
   const block = document.querySelector('.block-with-currency-selection');
   const button = document.querySelector('.block-with-currency-selection__button');
   if (!localStorage.getItem('currencySelected')) {
      wrapBlock.classList.add('show');
   }
   button.addEventListener('click', function(event) {
      localStorage.setItem('currencySelected', 'true');
      wrapBlock.classList.remove('show');
   });
   wrapBlock.addEventListener('click', function(event) {
      // Проверяем что клик был НЕ по блоку выбора валюты и НЕ внутри него
      if (!block.contains(event.target)) {
         wrapBlock.classList.remove('show');
      }
   });
});
document.addEventListener('DOMContentLoaded', function() {
   const sizeContainer = document.querySelector('.popup__dimensions');
   const chooseSizeLink = document.getElementById('product-choose-size');
   const addToCartButton = document.getElementById('add-to-cart');
   const quickPurchase = document.getElementById('quick-purchase');
   const popupSizeNotSelected = document.getElementById('popup-product-notification-size-not-selected');
   const popupSuccess = document.getElementById('popup-product-notification-successfully-added-to-cart');
   const popupQuickPurchase = document.getElementById('popup-product-quick-purchase');
   const body = document.body;

   /* выбор размера -> */
   if (sizeContainer) {
      sizeContainer.addEventListener('change', function() {
         const selectedSizes = Array.from(sizeContainer.querySelectorAll('input[type="checkbox"]:checked')).map(input => input.value);
   
         if (chooseSizeLink) {
            if (selectedSizes.length > 0) {
               chooseSizeLink.textContent = selectedSizes.join(', ');
               chooseSizeLink.classList.add('size-selected');
            } else {
               chooseSizeLink.textContent = 'Обрати розмір';
               chooseSizeLink.classList.remove('size-selected');
            }
         }
   
         if (addToCartButton && addToCartButton.hasAttribute('data-size')) {

            if (selectedSizes.length > 0) {
               addToCartButton.setAttribute('data-size', selectedSizes.join(', '));
            } else {
               addToCartButton.setAttribute('data-size', '');
            }
         }

         if (quickPurchase && quickPurchase.hasAttribute('data-size')) {

            if (selectedSizes.length > 0) {
               quickPurchase.setAttribute('data-size', selectedSizes.join(', '));
            } else {
               quickPurchase.setAttribute('data-size', '');
            }
         }
      });
   }
   /* <- выбор размера */

   /* действие по клику на кнопу Швидка покупка -> */
   if (quickPurchase) {
      quickPurchase.addEventListener('click', function(e) {
         e.preventDefault();
         const dataSize = quickPurchase.getAttribute('data-size');

         const popupBody = popupQuickPurchase.querySelector('.popup__body');
         if (popupBody) {
            popupBody.addEventListener('click', function() {
               popupQuickPurchase.classList.remove('open');
               setTimeout(() => {
                  body.classList.remove('lock');
               }, 600);
            });
         }
   
         function showPopup(popup, shouldAutoClose = true, duration = 3000) {
            if (!popup) return;
            popup.classList.add('open');
            body.classList.add('lock');
   
            if (shouldAutoClose) {
               setTimeout(() => {
                  popup.classList.remove('open');
                  setTimeout(() => {
                     body.classList.remove('lock');
                  }, 600);
               }, duration);
            }
         }
   
         if (quickPurchase.hasAttribute('data-size')) {
            if (dataSize.trim() === '') {
               showPopup(popupSizeNotSelected, true, 3000);
            } else {
               showPopup(popupQuickPurchase, false);

               const productSizeField = document.getElementById('product-size');
               if (productSizeField) {
                  productSizeField.value = dataSize.trim();
               }
            }
         }
      });
   }
   /* <- действие по клику на кнопу Швидка покупка */
}); 
document.addEventListener('DOMContentLoaded', function() {

   /* Удаление -> */
   document.addEventListener('click', function (e) {
      if (e.target && e.target.classList.contains('basket-delete')) {
         const productBlock = e.target.closest('.popup-basket__product');
         if (productBlock) {
            productBlock.remove();
         }
      }
   });
   /* <- Удаление */

   /* Генерация блока popup-basket__product -> */
   const addToCartButton = document.getElementById('add-to-cart');
   const popupSuccess = document.getElementById('popup-product-notification-successfully-added-to-cart');
   const popupSizeNotSelected = document.getElementById('popup-product-notification-size-not-selected');
   const popupAlreadyInCart = document.getElementById('popup-you-are-in-cart');
   const body = document.body;

   const basketContainer = document.querySelector('.popup-basket__wrap-list');
   const completeLookBlock = document.querySelector('.popup-basket__complete-look');

   function showPopup(popupElement) {
      if (!popupElement) {
         console.warn('Popup не найден!');
         return;
      }
      popupElement.classList.add('open');
      body.classList.add('lock');
      setTimeout(() => {
         popupElement.classList.remove('open');
         body.classList.remove('lock');
      }, 3000);
   }

   if (addToCartButton) {
      addToCartButton.addEventListener('click', function () {
         const name = addToCartButton.getAttribute('data-name');
         const image = addToCartButton.getAttribute('data-image');
         const price = addToCartButton.getAttribute('data-price');
         const color = addToCartButton.getAttribute('data-color');
         const code = addToCartButton.getAttribute('data-code');
         const dataSize = addToCartButton.getAttribute('data-size');

         // Проверка выбора размера
         if (!dataSize || dataSize.trim() === '') {
            showPopup(popupSizeNotSelected);
            return;
         }

         // Проверка повторного добавления
         const existingProduct = document.querySelector(`.popup-basket__product[data-id="${code}"]`);
         if (existingProduct) {
            showPopup(popupAlreadyInCart);
            return;
         }

         // HTML генерация
         const productHTML = `
            <div class="popup-basket__product" data-id="${code}">
               <div class="popup-basket__productBlockImage">
                  <img src="${image}" alt="">
               </div>
               <div class="popup-basket__productInfo">
                  <h3 class="basket-name">${name}</h3>
                  <div class="popup-basket__wrap-quantity-and-price">
                     <div class="number">
                        <span class="number__minus">-</span>
                        <input class="number__input" type="text" value="1" size="5">
                        <span class="number__plus">+</span>
                     </div>
                     <div class="popup-basket__wrap-price">
                        <p class="basket-price">${price}</p>
                        <button type="button" class="basket-delete">х</button>
                     </div>
                  </div>
                  <div class="popup-basket__wrap-list">
                     <ul>
                        <li>Розмір <strong class="basket-size">${dataSize}</strong></li>
                        <li>Колір <strong class="basket-color">${color}</strong></li>
                        <li>Код товар <strong class="basket-code">${code}</strong></li>
                     </ul>
                  </div>
               </div>
            </div>
         `;

         // Вставка перед блоком complete-look
         if (basketContainer) {
            if (completeLookBlock) {
               completeLookBlock.insertAdjacentHTML('beforebegin', productHTML);
            } else {
               basketContainer.insertAdjacentHTML('beforeend', productHTML);
            }

            showPopup(popupSuccess);
         }
      });
   }
   /* <- Генерация блока popup-basket__product */

   /* Обновение размера существующего товара в корзине -> */
   const observer = new MutationObserver(() => { // Следим за изменением data-size у кнопки, если товар уже в корзине
      const code = addToCartButton.getAttribute('data-code');
      const updatedSize = addToCartButton.getAttribute('data-size');

      // Проверяем, существует ли блок с таким товаром
      const existingProduct = document.querySelector(`.popup-basket__product[data-id="${code}"]`);
      if (existingProduct) {
         const sizeElement = existingProduct.querySelector('.basket-size');
         if (sizeElement && sizeElement.textContent !== updatedSize) {
            sizeElement.textContent = updatedSize;
         }
      }
   });
   if (addToCartButton) {
      observer.observe(addToCartButton, { // Настраиваем observer: слушаем только изменения атрибута data-size
         attributes: true,
         attributeFilter: ['data-size']
      });
   }
   /* <- Обновение размера существующего товара в корзине */

   /* Количество товаров в корзине (для иконка в шапке) -> */
   function updateBasketCount() {
      const basketIcon = document.getElementById('basket-icon');
      const basketContainer = document.querySelector('#popup-basket form');
   
      if (!basketIcon || !basketContainer) return;
   
      // Находим все .popup-basket__product, исключая те, что внутри .popup-basket__complete-look
      const productBlocks = Array.from(basketContainer.querySelectorAll('.popup-basket__product')).filter(block => {
         return !block.closest('.popup-basket__complete-look');
      });
   
      const count = productBlocks.length;
   
      // Сохраняем в localStorage
      localStorage.setItem('basketCount', count);
   
      // Обновляем span
      let span = basketIcon.querySelector('span');
   
      if (count > 0) {
         if (!span) {
            span = document.createElement('span');
            basketIcon.appendChild(span);
         }
         span.textContent = count;
      } else {
         if (span) span.remove();
      }
   }
   
   // Функция для запуска наблюдателя
   function startBasketObserver() {
      const basketContainer = document.querySelector('#popup-basket form');
      if (!basketContainer) return;
   
      const observer = new MutationObserver(updateBasketCount);
   
      observer.observe(basketContainer, {
         childList: true,
         subtree: true
      });
   
      // Первый вызов при запуске
      updateBasketCount();
   }
   
   // Проверка при загрузке
   const savedCount = parseInt(localStorage.getItem('basketCount'), 10);
   const basketIcon = document.getElementById('basket-icon');

   if (basketIcon && savedCount > 0) {
      let span = basketIcon.querySelector('span');
      if (!span) {
         span = document.createElement('span');
         basketIcon.appendChild(span);
      }
      span.textContent = savedCount;
   }

   // Если форма уже в DOM — запускаем отслеживание
   if (document.querySelector('#popup-basket form')) {
      startBasketObserver();
   } else {
      // Если форма еще не появилась — ждем её появления
      const popupBasket = document.getElementById('popup-basket');
      if (popupBasket) {
         const waitForForm = new MutationObserver(() => {
            const form = popupBasket.querySelector('form');
            if (form) {
               startBasketObserver();
               waitForForm.disconnect();
            }
         });

         waitForForm.observe(popupBasket, {
            childList: true,
            subtree: true
         });
      }
   }
   /* <- Количество товаров в корзине (для иконка в шапке) */

   /* Функция для отслеживания блока .popup-basket__complete-look (удаление в случае если все блоки popup-basket__product удалены) -> */
   function trackCompleteLookBlock() {
      const completeLookBlock = document.querySelector('.popup-basket__complete-look');
      if (!completeLookBlock) return; // Если блока нет, прекращаем отслеживание
      const observer = new MutationObserver(function() {
         // Ищем все элементы с классом popup-basket__product внутри .popup-basket__complete-look
         const productBlocks = completeLookBlock.querySelectorAll('.popup-basket__product');
         if (productBlocks.length === 0) { // Если все продукты удалены, удаляем блок .popup-basket__complete-look
            completeLookBlock.remove(); // Удаляем блок из DOM
         }
      });
      observer.observe(completeLookBlock, { // Настроим наблюдатель
         childList: true,   // Отслеживаем добавление и удаление дочерних элементов
         subtree: true      // Отслеживаем изменения во всех подэлементах
      });
   }
   trackCompleteLookBlock(); // Запускаем отслеживание блока .popup-basket__complete-look
   /* <- Функция для отслеживания блока .popup-basket__complete-look (удаление в случае если все блоки popup-basket__product удалены) */

});
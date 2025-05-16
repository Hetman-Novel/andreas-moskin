$(document).ready(function () { // Make sure the DOM is fully loaded before initializing Select2
    
   /* 
   * додай клас wrap-select-form до обгортки поля select,
   * і всередині wrap-select-form першим додай приховане поле, при виборі значення додаватиметься в приховане поле.
   * Якщо потрібно.
   $('select').each(function () {
      $(this).select2(); // Initialize Select2
      $(this).on('select2:select', function (e) { // Handler for the value selection event
         const selectedValue = e.params.data.text; // Get the text of the selected value
         const parentBlock = $(this).closest('.wrap-select-form'); // Parent block
         const hiddenField = parentBlock.find('input[type="hidden"]').first(); // Hidden field above select

         // If a hidden field is found, write the selected value into it
         if (hiddenField.length) {
            hiddenField.val(selectedValue);
         }
      });
   });
   */

   $('#select-country').select2({
      placeholder: "Виберіть країну",
      theme: 'order-placement-select'
   });
   $('#select-city').select2({
      placeholder: "Виберіть місто",
      theme: 'order-placement-select'
   });
   $('#select-time').select2({
      placeholder: "Виберіть час",
      theme: 'order-placement-select'
   });
   $('#select-date').select2({
      placeholder: "Виберіть дату",
      theme: 'order-placement-select'
   });
   $('#select-number-of-units').select2({
      placeholder: "Виберіть кількість",
      theme: 'order-placement-select'
   });
});

const phoneInput = document.getElementById('phone');

phoneInput.addEventListener('input', function (e) {
  let numbers = this.value.replace(/\D/g, '').substring(0, 9); // только цифры, не более 9

  let formatted = '';
  if (numbers.length > 0) formatted = '(' + numbers.substring(0, 2);
  if (numbers.length >= 3) formatted += ') ' + numbers.substring(2, 5);
  if (numbers.length >= 6) formatted += '-' + numbers.substring(5, 7);
  if (numbers.length >= 8) formatted += '-' + numbers.substring(7, 9);

  this.value = formatted;
});
document.addEventListener('DOMContentLoaded', function() {

   /* Удаление -> */
   let orderPlacementProductsDelete = document.querySelectorAll('.order-placement__productWrapTitle .delete');
   orderPlacementProductsDelete.forEach((orderPlacementProductDelete) => {
      orderPlacementProductDelete.addEventListener('click', function () {
         orderPlacementProductDelete.parentNode.parentNode.parentNode.remove();
      });
   });
   /* <- Удаление */
});
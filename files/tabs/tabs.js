document.addEventListener("DOMContentLoaded", function () {
   var tabsBlocks = document.querySelectorAll('.tabs');

   tabsBlocks.forEach(function (tabsBlock) {
      var tabs = tabsBlock.querySelectorAll('.tabs__wrap-tab .tab');
      var contents = tabsBlock.querySelectorAll('.tabContent');

      tabs.forEach(function (tab) {
         tab.addEventListener('click', function () {
            var tabId = this.getAttribute('data-tab');
            var targetContent = tabsBlock.querySelector('.tabContent[data-tabcontent="' + tabId + '"]');

            tabs.forEach(function (t) {
               t.classList.remove('tab-active');
            });

            contents.forEach(function (c) {
               c.classList.remove('content-active');
            });

            this.classList.add('tab-active');
            if (targetContent) {
               targetContent.classList.add('content-active');
            }
         });
      });
   });
});
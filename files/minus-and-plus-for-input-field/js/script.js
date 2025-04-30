$(function() {
	$(document).ready(function () {

		function updateZeroState($input) {
			const value = parseInt($input.val());
			const $parent = $input.closest('.number');
			if (value === 0 || isNaN(value)) {
				$parent.addClass('zero');
			} else {
				$parent.removeClass('zero');
			}
		}

		// Делегированные обработчики
		$(document).on('click', '.number__minus', function () {
			const $input = $(this).parent().find('.number__input');
			let count = parseInt($input.val()) - 1;
			count = count < 0 ? 0 : count;
			$input.val(count).change();
			updateZeroState($input);
			return false;
		});

		$(document).on('click', '.number__plus', function () {
			const $input = $(this).parent().find('.number__input');
			$input.val(parseInt($input.val()) + 1).change();
			updateZeroState($input);
			return false;
		});

		$(document).on('input', '.number__input', function () {
			const val = $(this).val().replace(/\D/g, '');
			$(this).val(val);
			updateZeroState($(this));
		});

		// Проверка при загрузке страницы
		$('.number__input').each(function () {
			updateZeroState($(this));
		});
	});
});
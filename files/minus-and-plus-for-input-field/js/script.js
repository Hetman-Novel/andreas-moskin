$(function () {
	$(document).ready(function () {

		// Обновляем атрибут value (для отслеживания)
		function syncInputValueAttribute($input) {
			$input.attr('value', $input.val());
		}

		// Добавляем или убираем класс zero
		function updateZeroState($input) {
			const value = parseInt($input.val(), 10);
			const $parent = $input.closest('.number');
			if (isNaN(value) || value <= 1) {
				$parent.addClass('zero');
			} else {
				$parent.removeClass('zero');
			}
		}

		// Обработчики
		$(document).ready(function () {
			$(document).on('click', '.number__minus', function () {
				const $input = $(this).parent().find('.number__input');
				let count = parseInt($input.val(), 10) - 1;
				count = count < 1 ? 1 : count;
				$input.val(count).change();
				syncInputValueAttribute($input);
				updateZeroState($input);
				return false;
			});

			$(document).on('click', '.number__plus', function () {
				const $input = $(this).parent().find('.number__input');
				let count = parseInt($input.val(), 10) + 1;
				$input.val(count).change();
				syncInputValueAttribute($input);
				updateZeroState($input);
				return false;
			});
		});

		// Ручной ввод
		$(document).on('input', '.number__input', function () {
			const val = $(this).val().replace(/\D/g, '');
			$(this).val(val);
			syncInputValueAttribute($(this));
			updateZeroState($(this));
		});

		// Проверка при загрузке
		$('.number__input').each(function () {
			syncInputValueAttribute($(this));
			updateZeroState($(this));
		});
	});
});

(function(d) {
	'use strict';

	window.note = function(content) {
		const create = (name, attr, append, content) => {
			let node = d.createElement(name);
			
			for (let value in attr) {
				if (attr.hasOwnProperty(value)) {
					node.setAttribute(value, attr[value]);
				}
			}

			if (content) {
				node.insertAdjacentHTML('afterbegin', content);
			}

			append.appendChild(node);

			if (node.classList.contains('note-item-hidden')) {
				node.classList.remove('note-item-hidden');
			}
			return node;
		};

		/**
		* Генерация элементов
		*/
		
		let noteBox = d.getElementById('notes') || create('div', { id: 'notes' }, d.body);
		let noteItem = create(
				'div',
				{
					class: 'note-item',
					'data-show': 'false',
					role: 'alert',
				},
				noteBox
			),
			noteItemText = create('div', { class: 'note-item-text' }, noteItem, content),
			noteItemBtn = create(
				'button',
				{
					class: 'note-item-btn',
					type: 'button',
					'aria-label': 'Скрыть'
				},
				noteItem
			);

		/**
     * Функция проверки видимости алерта во viewport
     * @returns {boolean}
     */
		let isVisible = function() {
			let coords = noteItem.getBoundingClientRect();
			return (
				coords.top >= 0 &&
				coords.left >= 0 &&
				coords.bottom <= (window.innerHeight || d.documentElement.clientHeight) &&
				coords.right <= (window.innerWidth || d.documentElement.clientWidth)
			);
		};

		/**
     * Функция удаления алертов
     * @param {Object} [el] - удаляемый алерт
     */
		let remove = function(el) {
			el = el || noteItem;
			el.setAttribute('data-show', 'false');
			window.setTimeout(function() {
				el.remove();
			}, 250);
		};

		/**
     * Удаление алерта по клику на кнопку
     */
		noteItemBtn.addEventListener('click', function() {
			remove();
		});

		/**
     * Визуальный вывод алерта11
     */
		window.setTimeout(function() {
			noteItem.setAttribute('data-show', 'true');
		}, 250);

		/**
     * Проверка видимости алерта и очистка места при необходимости
     */
		if (!isVisible()) remove(noteBox.firstChild);

		/**
     * Автоматическое удаление алерта спустя заданное время
     */
		window.setTimeout(remove, 3000);
	};
})(document);

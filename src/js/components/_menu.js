;(function() {
	hdr = document.querySelector('.hdr');
	menu = new SimpleMenu({
		mediaQuery: '(max-width: 992px)',
		menu: '.mobile-menu',
		openBtn: {
			selector: '.burger-btn',
			class: 'active'
		},
		overlay: {
			zi: 3,
			css: 'background:rgba(64,54,55,.85);'
		},
		closeBtn: {
			selector: '.burger-btn',
			class: 'active'
		},
		toRight: true
	});

	if (menu.style) {
		menu.addEventListener('beforeopen', function() {
			hdr.classList.add('active');
		});
		menu.addEventListener('beforeclose', function() {
			hdr.classList.remove('active');
		});
	}
})();
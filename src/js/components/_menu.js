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
			css: 'background:rgba(64,54,55,0.2);backdrop-filter:blur(5px);'
		},
		closeBtn: {
			selector: '.burger-btn',
			class: 'active'
		}
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
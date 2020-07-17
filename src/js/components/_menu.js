;(function() {
	hdr = document.querySelector('.hdr');
	menu = new MobileMenu({
		menu: '.mobile-menu',
		openBtn: '.burger-btn',
		closeBtn: '.burger-btn',
		overlay: '.overlay',
		fixHeader: '.hdr',
		toRight: true 
	});

	if (menu.style) {
		menu.addEventListener('menubeforeopen', function() {
			hdr.classList.add('active');
		});
		menu.addEventListener('menubeforeclose', function() {
			hdr.classList.remove('active');
		});
	}
})();
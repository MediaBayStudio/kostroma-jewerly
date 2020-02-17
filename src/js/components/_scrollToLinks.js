;(function() {
	let linkNav = document.querySelectorAll('a:not(.disabled)[href^="#"]'),
		targets = document.querySelectorAll('#start, #catalog, #delivery, #contacts'),
		V = .25;

		
	for (let i = 0; i < linkNav.length; i++) {
		linkNav[i].addEventListener('click', function() {

			event.preventDefault();

				let wndwY = window.pageYOffset,
				hash = this.href.replace(/[^#]*(.*)/, '$1'),
				targetTop = document.querySelector(hash).getBoundingClientRect().top - hdr.offsetHeight,
				start = null;

			requestAnimationFrame(step);

			function step(time) {
				if (start === null) {
					start = time;
				}
				let progress = time - start,
					r = (targetTop < 0 ? Math.max(wndwY - progress/V, wndwY + targetTop) : Math.min(wndwY + progress/V, wndwY + targetTop));

				window.scrollTo(0, r);


				if (r != wndwY + targetTop) {
					requestAnimationFrame(step);
				} else {
					location.hash = hash;
				}
			}
		});
	}

})();
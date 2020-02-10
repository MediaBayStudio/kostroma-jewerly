;(function() {
	let linkNav = document.querySelectorAll('a:not(.disabled)[href^="#"]'),
		targets = document.querySelectorAll('#start, #catalog, #delivery, #contacts'),
		V = .25;
		// allowPageScroll = true,
		// pageScrolling = function() {
		// 	if (allowPageScroll) {
		// 		let wndwScroll = {
		// 			top: pageYOffset,													
		// 			bottom: pageYOffset + window.screen.height
		// 		};
		// 		for (let i = 0; i < targets.length; i++) {
		// 			if (targets[i].posBottom > wndwScroll.top && targets[i].posTop < wndwScroll.bottom) {
		// 				let link = [],
		// 					nodeList = document.querySelectorAll('[href="#' + targets[i].id + '"]');
		// 					console.log(targets[i].posBottom);
		// 				for (let m = 0; m < nodeList.length; m++) {
		// 					link.push(nodeList[m]);
		// 				}
		// 				if (link.every(function(el){return el.classList.contains('active')})) {
		// 					return;
		// 				}

		// 				for (let j = 0; j < linkNav.length; j++) {
		// 					if (link.every(function(el){return el !== linkNav[j]})) {
		// 						linkNav[j].classList.remove('active');
		// 					}
		// 				}
		// 				for (let k = 0; k < link.length; k++) {
		// 					link[k].classList.add('active');
		// 				}
		// 				// break;
		// 			}
		// 		}
		// 	}
		// };

	// for (let i = 0; i < targets.length; i++) {
	// 	let styles = getComputedStyle(targets[i]),
	// 		coords = targets[i].getBoundingClientRect();
	// 	targets[i].posTop = coords.top + pageYOffset + +styles.paddingTop.slice(0, -2);
	// 	targets[i].posBottom = coords.bottom + pageYOffset - +styles.paddingBottom.slice(0, -2);
	// }
		
	for (let i = 0; i < linkNav.length; i++) {
		linkNav[i].addEventListener('click', function() {
			// for (let j = 0; j < linkNav.length; j++) {
			// 	linkNav[j].classList.remove('active');
			// }
			// this.classList.add('active');
			event.preventDefault();
			// allowPageScroll = false;
				let w = window.pageYOffset,
				hash = this.href.replace(/[^#]*(.*)/, '$1'),
				t = document.querySelector(hash).getBoundingClientRect().top,
				start = null;

			requestAnimationFrame(step);

			function step(time) {
				if (start === null) {
					start = time;
				}
				let progress = time - start,
					r = (t < 0 ? Math.max(w - progress/V, w + t) : Math.min(w + progress/V, w + t));

				window.scrollTo(0, r);

				if (r != w + t) {
					requestAnimationFrame(step);
				} else {
					// allowPageScroll = true;
					location.hash = hash;
				}
			}
		});
	}

	// window.addEventListener('scroll', pageScrolling);
	// pageScrolling();


})();
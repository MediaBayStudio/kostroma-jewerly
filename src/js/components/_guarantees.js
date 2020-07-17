;(function() {
	let	guarantees = document.querySelectorAll('.delivery-card__guarantee'),
		clickHandler = function() {
			if (!this.classList.contains('active')) {				
				for (let k = 0; k < guarantees.length; k++) {
					guarantees[k].classList.remove('active');
				}
			}			
			this.classList.toggle('active');
		};

	for (let i = 0; i < guarantees.length; i++) {
		guarantees[i].addEventListener('click', clickHandler);
	}

})();
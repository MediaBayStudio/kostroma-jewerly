(function(ELEMENT) {
  ELEMENT.matches = ELEMENT.matches || ELEMENT.mozMatchesSelector || ELEMENT.msMatchesSelector || ELEMENT.oMatchesSelector || ELEMENT.webkitMatchesSelector;
  ELEMENT.closest = ELEMENT.closest || function closest(selector) {
      if (!this) return null;
      if (this.matches(selector)) return this;
      if (!this.parentElement) {return null}
      else return this.parentElement.closest(selector)
    };
}(Element.prototype));

;(function () {
  if (typeof window.CustomEvent === "function") return false;

  function CustomEvent (event, params) {
    params = params || {bubbles: false, cancelable: false, detail: null};
    let evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  }
  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent;
})();

let menu,
	tryingPopup,
	thanksPopup,
  quizPopup,
	overlay,
	hdr;

window.addEventListener('resize', () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});

let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
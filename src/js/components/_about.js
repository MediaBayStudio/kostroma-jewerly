;(function() {
  let descBlock = document.querySelector('.about-sect__desc-block'),
    moreBtn = document.querySelector('.desc-block__more-btn');

  moreBtn.addEventListener('click', function() {
    descBlock.classList.remove('elipsis')
  });
})();
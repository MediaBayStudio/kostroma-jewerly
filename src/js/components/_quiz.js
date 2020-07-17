;(function() {

  let dir = document.querySelector('#dir').dataset.dir,
    xhr = new XMLHttpRequest(),
    stepsLength,
    currentStep = 0,
    data = {},
    labels,
    stepsInsides = [],
    response,
    quizTitle,
    popup = document.querySelector('.quiz-popup'),
    popupTitle = popup.querySelector('.quiz-popup__title'),
    popupDesc = popup.querySelector('.quiz-popup__desc'),
    popupBtn = popup.querySelector('.quiz-form__btn'),
    quizForm = popup.querySelector('.quiz-form'),
    ldr = popup.querySelector('.loader-bg'),
    progressWrap = popup.querySelector('.progress'),
    finalForm = popup.querySelector('.quiz-popup__form'),
    thanks = popup.querySelector('.quiz-popup__thanks-wrap'),
    resultInp = popup.querySelector('#quiz-result-inp'),
    progressBar = progressWrap.querySelector('.progress__bar'),
    progressPercent = progressWrap.querySelector('.progress__percent'),
    buildInsides = function(elem) {
      let str = '<b class="quiz-form__title">' + elem.question + '</b>' +
        (function() {
          let string = '';
          for (let value in elem.answers) {
            string += `<label class="quiz-form__lbl"><div class="quiz-form__pseudo-inp"></div><span class="quiz-form__lbl-text">${elem.answers[value]}</span></label>`
          }
          return string;
        })();
      return str;
    },
    insertInsides = function() {
      quizForm.insertAdjacentHTML('beforeend', stepsInsides[currentStep]);
      quizForm.dataset.step = response[currentStep].name;
      labels = quizForm.querySelectorAll('.quiz-form__lbl');
      quizTitle = quizForm.querySelector('.quiz-form__title');
      popupBtn.classList.add('disabled');
    };

  quizPopup.addEventListener('close', function() {
    currentStep = 0;
    progressBar.style.width =  '0%';
    progressPercent.textContent = '0%';


    quizForm.classList.remove('hide');
    popupTitle.classList.remove('hide');
    popupDesc.classList.remove('hide');
    popupBtn.classList.remove('hide');
    progressWrap.classList.remove('hide');

    finalForm.classList.add('hide');
    thanks.classList.add('hide');

    if (quizForm.children.length > 0) {
      for (let i = 0; i < labels.length; i++) {
        if (labels[i].classList.contains('active')) {
          for (let key in response) {
            let elem = response[key];
            if (elem['name'] === quizForm.dataset.step) {
              data[elem['question']] = labels[i].textContent;
            }
          }
          // data[quizForm.dataset.step] = labels[i].textContent;
        }
        quizForm.removeChild(labels[i]);
      }
      quizForm.removeChild(quizTitle);
    }
    

      insertInsides();
  });

  xhr.open('GET', dir + '/quiz.json');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send();

  ldr.classList.add('active');
  xhr.addEventListener('readystatechange', function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      response = JSON.parse(xhr.response).steps;
      stepsLength = response.length;
      ldr.classList.remove('active');

      for (let key in response) {
        let elem = response[key],
          str = buildInsides(elem);

        stepsInsides.push(str);
        data[elem['question']] = '';
      }

      insertInsides();
    }
  });

  popupBtn.addEventListener('click', function() {
    if (!this.classList.contains('disabled')) {
      // insert in data
      for (let i = 0; i < labels.length; i++) {
        if (labels[i].classList.contains('active')) {
          for (let key in response) {
            let elem = response[key];
            if (elem['name'] === quizForm.dataset.step) {
              data[elem['question']] = labels[i].textContent;
            }
          }
        }
        quizForm.removeChild(labels[i]);
      }
      quizForm.removeChild(quizTitle);

      if (stepsLength - currentStep > 1) {
        currentStep++;
        // print percents
        let percent = currentStep / stepsLength * 100,
          currentPercent = +progressPercent.textContent.slice(0, -1),
          number = currentPercent,
          timer = setInterval(function() {

            progressPercent.textContent = ++number + '%';
            if (number >= percent) {
              clearInterval(timer);
            }
          }, 10);

        progressBar.style.width =  percent + '%';

        insertInsides();
      } else {
        // final step
        currentStep = 0;
        quizForm.classList.add('hide');
        finalForm.classList.remove('hide');
        popupTitle.classList.add('hide');
        popupDesc.classList.add('hide');
        popupBtn.classList.add('hide');
        progressWrap.classList.add('hide');
        progressBar.style.width =  '0%';
        progressPercent.textContent = '0%';

        let resultString = '',
          i = 0;
        for (let key in data) {
          resultString += (i === 0 ? key : ' ' + key) + ' ' + data[key] + ';';
          i++;
        }
        resultInp.value = resultString;

      }
    }
  });

  quizForm.addEventListener('click', function() {
    let target = event.target;
    if (target.classList.contains('quiz-form__lbl') & !target.classList.contains('active')) {
      for (let i = 0; i < labels.length; i++) {
        labels[i].classList.remove('active');
      }
      popupBtn.classList.remove('disabled');
      target.classList.add('active');
    }  
  });
})();
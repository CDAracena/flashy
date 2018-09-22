$(document).ready(function() {

  let IncompleteArray = [];
  let CompletedArray = [];
  let randomCardIndex;
  let cardTitle = document.querySelector('.card-title-input')
  let cardDefinition = document.querySelector('.card-description-input');
  let timerClock;
  let randomCard;

  function moveCardToComplete() {
    CompletedArray.push(randomCard)
    removeCard(IncompleteArray[randomCardIndex].fcTitle)
    addCompletedCard(IncompleteArray[randomCardIndex].fcTitle)
  }

  function removeCardFromIncomplete() {
    IncompleteArray.splice(randomCardIndex, 1)
  }

  function setrandomCardIndex() {
    randomCardIndex = Math.floor(Math.random() * IncompleteArray.length);
    randomCard = IncompleteArray[randomCardIndex];
  }

  function startQuiz() {
    setrandomCardIndex();
    timer();
  }

  function continueQuiz() {
    if (IncompleteArray.length > 0) {
      setrandomCardIndex();
      timer();
    } else {
      console.log(IncompleteArray);
    }
  }

  if (IncompleteArray.length === 0) {
    $('.status-message').text("Lets get started");
  }

  let addFlashCardBtn = document.querySelector('.add-button');

  addFlashCardBtn.addEventListener('click', function() {
    $('.modal').fadeIn('slow')
  })

  $('.close-modal-icon').click(function() {
    $('.modal').fadeOut('slow');
  })

  $('.cancel-btn').click(function() {
    $('.modal').fadeOut('slow');

  })

  // Works !!
  function addCard() {
    let row = document.querySelector('.incomplete-col-container')
    let col = document.createElement('div');
    col.classList.add('flash-card-item');
    col.innerText = IncompleteArray[IncompleteArray.length - 1].fcTitle;
    row.appendChild(col)
  }

  // Adding a new card function starts here
  // Works
  $('.add-card-button').click(function() {
    if (cardTitle.value && cardDefinition.value) {
      IncompleteArray.push({fcTitle: cardTitle.value, fcDescription: cardDefinition.value});
      $('.modal').fadeOut('slow');
      $('.status-message').text("Add more")
      toastr.success(`${cardTitle.value} has been added!`)
      $('.card-title-input').val('');
      $('.card-description-input').val('');
      addCard();
      $('.flash-card-col').removeClass('col-lg-8').addClass('col-lg-4');
      $('.flash-card-col').css({"margin-right": "15px"})
      $('.flag-container').css({"display": "block"})
    } else {
      toastr.error('Please make sure to fill out card title or card description')
    }
  })
  // Adding a new card function ends here
  function setTimeDivChanges() {
    $('.timer-div').css({"display": "block"});
    $('.flag-container').fadeOut('slow');
    $('.add-btn-container').removeClass('col-lg-4').addClass('col-lg-8 h2 render-card-title');
    $('.add-btn-container').addClass('add-scale-keyframe');
  }
  function setHTMLTime() {
    $('.timer-div').html(timerClock.getTimeValues().toString());
    $('.add-btn-container').html(IncompleteArray[randomCardIndex].fcTitle);
    $('.add-btn-container').css({"margin": "0px"});
  }

  function setTimerFinish() {
    $('.timer-div').html('Times Up');
    $('.add-btn-container').addClass('add-rotate-keyframe');
    $('.add-btn-container').addClass('render-card-rotate');
    $('.add-btn-container').html(IncompleteArray[randomCardIndex].fcDescription);
    $('.results-row').fadeIn("slow")
    $('.results-row').css({"display": "flex"})
  }
  function timer() {
    setTimeDivChanges();

    timerClock = new Timer();

    timerClock.start({
      countdown: true,
      startValues: {
        seconds: 15
      }
    });
    setHTMLTime();

    timerClock.addEventListener('secondsUpdated', function(e) {
      $('.timer-div').html(timerClock.getTimeValues().toString());
    });
    timerClock.addEventListener('targetAchieved', function(e) {
      setTimerFinish();

    });
  }
  //Start Quiz function starts here
  $('.start-btn').click(function() {
    startQuiz();

  })

  function removeCard(flashCardItem) {
    incompleteFlashCards = document.querySelectorAll('.flash-card-item');
    for (let i = 0; i < incompleteFlashCards.length; i++) {
      if (incompleteFlashCards[i].innerText === flashCardItem) {
        incompleteFlashCards[i].classList.add('selected');
        $('.selected').fadeOut("slow");
      }
    }
  }
  function addCompletedCard(flashCardItem) {
    let row = document.querySelector('.completed-col-container');
    let col = document.createElement('div');
    col.classList.add('flash-card-item');
    col.innerText = flashCardItem
    row.appendChild(col);
  }

  let resultOptions = document.querySelectorAll('.results-choice');
  resultOptions[0].addEventListener('click', function() {
    moveCardToComplete();
    removeCardFromIncomplete();
    $('.results-row').fadeOut("slow");
    $('.results-row').css({"display": "none"});
    continueQuiz();
  })
  resultOptions[1].addEventListener('click', function() {
    continueQuiz();
  })

})

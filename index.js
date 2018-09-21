$(document).ready(function() {

  let IncompleteArray = [];
  let CompletedArray = [];
  let randomCard;
  let cardTitle = document.querySelector('.card-title-input')
  let cardDefinition = document.querySelector('.card-description-input');
  let timerClock;

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

function timer(){
  $('.timer-div').css({"display": "block"});
  $('.flag-container').fadeOut('slow');
  $('.add-btn-container').removeClass('col-lg-4').addClass('col-lg-8 h2 render-card-title');
  $('.add-btn-container').addClass('add-scale-keyframe');

  timerClock = new Timer();

  timerClock.start({
    countdown: true,
    startValues: {
      seconds: 1
    }
  });
  $('.timer-div').html(timerClock.getTimeValues().toString());
  randomCard = Math.floor(Math.random() * IncompleteArray.length)
  console.log('Random has been selected after start: ' + JSON.stringify(IncompleteArray[randomCard]))
  console.log('Incomplete Array currently contains: ' + JSON.stringify(IncompleteArray));
  $('.add-btn-container').html(IncompleteArray[randomCard].fcTitle);
  // console.log('selected card is :' + IncompleteArray[randomCard].fcTitle + ' incomplete array is ' + JSON.stringify(IncompleteArray))
  timerClock.addEventListener('secondsUpdated', function(e) {
    $('.timer-div').html(timerClock.getTimeValues().toString());
  });
  timerClock.addEventListener('targetAchieved', function(e) {
    $('.timer-div').html('Times Up');
    $('.add-btn-container').addClass('add-rotate-keyframe');
    $('.add-btn-container').addClass('render-card-rotate')
    $('.add-btn-container').html(IncompleteArray[randomCard].fcDescription);
    $('.results-row').fadeIn("slow")
    $('.results-row').css({"display": "flex"})

  });
}
  //Start Quiz function starts here
  $('.start-btn').click(function() {
    timer();

  })

  function removeCard(flashCardItem){
    incompleteFlashCards = document.querySelectorAll('.flash-card-item');
    for (let i = 0; i < incompleteFlashCards.length; i++){
      if (incompleteFlashCards[i].innerText === flashCardItem){
        // console.log("The card that should be removed:" + incompleteFlashCards[i].innerText)
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
  resultOptions[0].addEventListener('click', function(){
    shiftCards(IncompleteArray, resultOptions[0])
  })
  resultOptions[1].addEventListener('click', function(){
    shiftCards(IncompleteArray, resultOptions[1])
  })


  function shiftCards(incompleteArr, options){
    if (options.classList.contains("correct") && incompleteArr) {
      CompletedArray.push(incompleteArr[randomCard])
      // console.log( 'Item being pushed into completed array:' + incompleteArr[randomCard].fcTitle)
      removeCard(incompleteArr[randomCard].fcTitle);
      addCompletedCard(incompleteArr[randomCard].fcTitle);
      IncompleteArray.splice(incompleteArr.indexOf(incompleteArr[randomCard], 1))
      console.log('Incomplete Array is now: '+ JSON.stringify(incompleteArr) + 'and flash card: ' + JSON.stringify(incompleteArr[randomCard]) + 'was removed');
      timer();
      console.log("Timer has been called and random card is: " + JSON.stringify(IncompleteArray[randomCard]))
      console.log("Timer has been called and incomplete array has: " + JSON.stringify(IncompleteArray));
    } else if (options.classList.contains("wrong")) {
      timer();
    }
  }

})

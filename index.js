$(document).ready(function() {

  let IncompleteArray = [];
  let CompletedArray = [];
  let randomCard;
  let cardTitle = document.querySelector('.card-title-input')
  let cardDefinition = document.querySelector('.card-description-input');

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

  function addCard() {
    let row = document.querySelector('.incomplete-col-container')
    let col = document.createElement('div');
    col.classList.add('flash-card-item');
    col.innerText = IncompleteArray[IncompleteArray.length - 1].fcTitle;
    row.appendChild(col)

  }

  function addCompletedCard() {
    let row = document.querySelector('.completed-col-container');
    let col = document.createElement('div');
    col.classList.add('flash-card-item');
    col.innerText = IncompleteArray[randomCard].fcTitle
    row.appendChild(col);
  }
  // Adding a new card function starts here

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

  //Start Quiz function starts here
  $('.start-btn').click(function() {
    $('.timer-div').css({"display": "block"});
    $('.flag-container').fadeOut('slow');
    $('.add-btn-container').removeClass('col-lg-4').addClass('col-lg-8 h2 render-card-title');
    $('.add-btn-container').addClass('add-scale-keyframe');

    var timer = new Timer();

    timer.start({
      countdown: true,
      startValues: {
        seconds: 20
      }
    });
    $('.timer-div').html(timer.getTimeValues().toString());
    randomCard = Math.floor(Math.random() * IncompleteArray.length)
    $('.add-btn-container').html(IncompleteArray[randomCard].fcTitle);

    timer.addEventListener('secondsUpdated', function(e) {
      $('.timer-div').html(timer.getTimeValues().toString());
    });
    timer.addEventListener('targetAchieved', function(e) {
      $('.timer-div').html('Times Up');
      $('.add-btn-container').addClass('add-rotate-keyframe');
      $('.add-btn-container').addClass('render-card-rotate')
      $('.add-btn-container').html(IncompleteArray[randomCard].fcDescription);
      $('.results-row').fadeIn("slow")
      $('.results-row').css({"display": "flex"})

    });
  })

  let resultOptions = document.querySelectorAll('.results-choice');
  for (let i = 0; i < resultOptions.length; i++) {
    resultOptions[i].addEventListener('click', function() {
      if (resultOptions[i].classList.contains("correct")) {
        CompletedArray.push(IncompleteArray[randomCard])
        addCompletedCard();
        IncompleteArray.splice(IncompleteArray.indexOf(IncompleteArray[randomCard], 1))
        console.log(IncompleteArray);
        console.log(CompletedArray)
      } else if (resultOptions[i].classList.contains("wrong")) {
        console.log("You got it wrong =[")
      }
    })
  }

})

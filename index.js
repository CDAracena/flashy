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

function addCard(){
  let row = document.querySelector('.incomplete-col-container')
    let col = document.createElement('div');
    col.classList.add('flash-card-item');
    col.innerText = IncompleteArray[IncompleteArray.length -1].fcTitle;
    row.appendChild(col)

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
$('.start-btn').click(function(){
  randomCard = Math.floor(Math.random() * IncompleteArray.length)
  $('.timer-div').css({"display": "block"});
  $('.flag-container').css({"display": "none"});
  $('.add-btn-container').css({"display": "none"})

  var timer = new Timer();

  timer.start({countdown: true, startValues: {seconds: 20}});
  $('.timer-div').html(timer.getTimeValues().toString());

  timer.addEventListener('secondsUpdated', function (e) {
  $('.timer-div').html(timer.getTimeValues().toString());
  });
  timer.addEventListener('targetAchieved', function (e) {
  $('.timer-div').html('Times Up');
  });
})


})

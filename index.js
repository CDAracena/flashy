$(document).ready(function() {

  let IncompleteArray = [];
  let CompletedArray = [];
  let randomCard = Math.floor(Math.random() * IncompleteArray.length)
  let cardTitle = document.querySelector('.card-title-input')
  let cardDefinition = document.querySelector('.card-description-input');

  if (IncompleteArray.length === 0) {
    $('.status-message').text("Looks like you haven't added any cards yet...");
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

// Adding a new card function starts here

  $('.add-card-button').click(function() {
    if (cardTitle.value && cardDefinition.value) {
      IncompleteArray.push({fcTitle: cardTitle.value, fcDescription: cardDefinition.value});
      console.log(IncompleteArray)
      $('.modal').fadeOut('slow');
      $('.status-message').text("Looks like you added some cards! Feel free to add more..or start")
      toastr.success(`${cardTitle.value} has been added!`)
      $('.card-title-input').val('');
      $('.card-description-input').val('');
    } else {
      toastr.error('Please make sure to fill out card title or card description')
    }
  })
// Adding a new card function ends here
})

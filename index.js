$(document).ready(function(){

let collectingDataArray = [];
let IncompleteArray = [];
let CompletedArray = [];
let randomCard = Math.floor(Math.random() * IncompleteArray.length)

let cardTitle = document.querySelector('.card-title-input')
let cardDefinition = document.querySelector('.card-description-input');
let statusMessage = document.querySelector('.status-message');
let addCardBtn = document.querySelector('add-card-button');

if (IncompleteArray.length === 0){
  statusMessage.innerText = "Looks like you haven't added any cards yet...";
}

let addFlashCardBtn = document.querySelector('.add-button');

addFlashCardBtn.addEventListener('click', function(){
  $('.modal').fadeIn('slow')
})

$('.close-modal-icon').click(function(){
  $('.modal').fadeOut('slow');
})

$('.cancel-btn').click(function(){
  $('.modal').fadeOut('slow');
})


$('.add-card-button').click(function(){
  IncompleteArray.push({fcTitle: cardTitle.value, fcDescription: cardDefinition.value});
console.log(IncompleteArray)
$('.modal').fadeOut('slow');
})


})

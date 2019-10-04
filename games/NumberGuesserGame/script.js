/*
Game function:
 - player must guess a number between a min and max
 - player gets a certain amount of guesses
 - notify the player of guesses remaining
 - notify the player of the correct answer if loose
 - let player choose to play again
  */


// game values

let min = 1,
    max = 11,
    winningNum = 9,
	guessLeft = 6;
    

// UI Elements
const game =  document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-value'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;






//listen for guess
guessBtn.addEventListener('click',function(){                         // main function that is attached to the clicking of the button
  let guess = parseInt(guessInput.value);




  //Validate
  if(isNaN(guess) || guess < min || guess > max){                                     // first if statement
    setMessage(`Please enter a number between ${min} and ${max}`,'red');

   }
   
   
  else if(guess ===  winningNum){
  // check if won
                                                      
  // disabled input
  guessInput.disabled = true;
  // change border color
  guessInput.style.borderColor = 'green';

  // Set Message
  setMessage(`${winningNum} is correct .. YOU WIN !!` , 'green');                   // set message is a function
  }
  
  
  
  else if(guess!==winningNum) {
     // Game continues - answer wrong               // important
	 
     //Change border color
     guessInput.style.borderColor = 'red';

     // Clear Input
     guessInput.value = '';
	 
	 guessLeft = guessLeft -1;
     //Tell user its the wrong number


	 if(guessLeft == 0){                                                                         // else statement
   //Wrong number +  // Game over - lost
           
   // disabled input
     guessInput.disabled = true;
     // change border color
     guessInput.style.borderColor = 'red';

     // Set Message
     setMessage(`Game Over, you lost ! The correct number was ${winningNum}` , 'red');
    }else{ setMessage(`${guess} is not correct , ${guessLeft} guesses left` , 'red')};
	
	}


  });




// Game over function
function gameOver(won , msg){
let color;
(won === true) ? color = 'green' : color = 'red';
// disabled input
guessInput.disabled = true;
// change border color
guessInput.style.borderColor = 'red';

// Set Message
setMessage(`Game Over, you lost ! The correct number was ${winningNum}` , 'red');
}


//set message function
function setMessage(msg,color){

message.style.color = color;
message.textContent = msg;
}




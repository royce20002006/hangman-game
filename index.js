
const readline = require('readline');
const { randomWord } = require('./words.js');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let gameState = () => {
  // set variables that will keep track of everything.. 
  let arr = [];
  let word = randomWord();
  let numberOfAttempts = 20;
  let guessedLetter = [];
  let incorrect = [];
  let displayWord = ''
  

  let wordState = () => {
    
    for (let i = 0; i < word.length; i++) {
      if (guessedLetter.includes(word[i])) {
        arr.push(word[i])
        displayWord += word[i];
      } else {
        displayWord += '_';
      }
    }

    
    
    if (displayWord === word) {
      console.log('Congratulations! You guessed the word.');
      rl.question('Would you like to Play again (y or n) ', condition => {
        if (condition === 'y') gameState();
        else return rl.close();
      })
     
    } else {
      userGuesses();
    }
  }


  let userGuesses = () => {
    console.log(displayWord);
    rl.question('Guess a letter ', letter => {
      if (numberOfAttempts < 0) {
        console.log(`Sorry, you've run out of attempts. The word was: ${word}`);
        rl.question('Would you like to Play again (y or n) ', condition => {
          if (condition === 'y') gameState();
          else return rl.close();
        })

      }
      console.log(`You have ${numberOfAttempts} left.`)
      
      if (word.includes(letter) && !guessedLetter.includes(letter)) {
        guessedLetter.push(letter);
        incorrect.push(letter);

        wordState();
      } else {
        if (!incorrect.includes(letter)) {
          numberOfAttempts--;
          incorrect.push(letter);
          console.log('try again')
          userGuesses();
        }
        else {
          console.log(`You already guessed this letter so your number of attempts did not change. Go ahead and try again.`)
          userGuesses();
        }
      }
    })
  }


  wordState();
}
gameState();
import React from 'react';
import { NUM_OF_GUESSES_ALLOWED } from '../../constants';
import GuessInput from '../GuessInput/GuessInput';
import GuessList from '../GuessList/GuessList';
import Banner from '../Banner/Banner';
import NewWordButton from '../NewWordButton';

// Retrieve Word From Backend
async function generateWord(){

  const ENDPOINT = "https://main.d3h1f1bjakwo8t.amplifyapp.com/word"

  //Send Request To Backend
  const response = await fetch(ENDPOINT,{
    method: 'GET'
  })
  const json = await response.json()

  //Return json => {'answer':'answer'}
  return (json)
}

// Crteate Empty Array to init guesses state var
function emptyGuessesArr()
{
  let arr = []
  for(let row=0;row<NUM_OF_GUESSES_ALLOWED;row++)
  {
    arr[row]= new Array(5)
    for(let col=0;col<5;col++)
    {
      arr[row][col]=''
    }
  }
  return arr;
}

//Component That Controls Game Logic
function Game() {
  const [guesses,setGuesses] = React.useState(emptyGuessesArr()); //initialized to 6 beginning
  const [attempts,setAttempts] = React.useState(0); 
  const [isCorrect,setIsCorrect] = React.useState(false);
  const [isGameOver,setIsGameOver] = React.useState(false);
  const [answer,setAnswer] = React.useState("");

  //On Mount Retrieve Word From Backend
  React.useEffect(() => {
    async function fetchWord() {
      const ans = await generateWord();
      setAnswer(ans.answer);
      console.log("Answer is "+ans.answer);
    }
    fetchWord()
  }, []);

  /*Handle Adding Guess:
    add into guesses array -> update attempts -> check if max attempt reached
  */
  function handleAddGuess(guess){
    const newGuess= guess;
    var nextGuesses = new Array(6);

    //Add Into nextGuesses Arr
    for (let i = 0; i < NUM_OF_GUESSES_ALLOWED; i++) {
      if(i==attempts)
      {
        nextGuesses[i]=newGuess;
      }
      else
      {
        nextGuesses[i]=guesses[i];
      }
    }

    //Update Guesses Array
    setGuesses(nextGuesses);

    //Increase num of Attempt after guess logged
    setAttempts(attempts+1);

    //Check if max attempt reached
    if(attempts>=(NUM_OF_GUESSES_ALLOWED-1))
    {
      setIsGameOver(true)
    }
  }
  
  return(
  <>
    {(isCorrect||isGameOver)&&
      <NewWordButton>Generate New Word!</NewWordButton>
    }

    <GuessList guesses={guesses} answer={answer}/>
    
    {(!isCorrect&&!isGameOver)&&
      <GuessInput answer={answer} handleAddGuess={handleAddGuess} setIsCorrect={setIsCorrect} />
    }
    
    {(isCorrect||isGameOver)&&
      <Banner isCorrect={isCorrect} attempts={attempts} answer={answer}/>
    }
  </>
  )
}

export default Game;

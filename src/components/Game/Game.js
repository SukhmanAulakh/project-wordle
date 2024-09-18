import React from 'react';

import { sample } from '../../utils';
import { WORDS } from '../../data';
import { NUM_OF_GUESSES_ALLOWED } from '../../constants';
import GuessInput from '../GuessInput/GuessInput';
import GuessList from '../GuessList/GuessList';
import Banner from '../Banner/Banner';
import NewWordButton from '../NewWordButton';

// Retrieve Word From Backend
const ENDPOINT = "https://project-wordle-backend-deploy-e330c50ddfb0.herokuapp.com/word"

async function generateWord(endpoint){

  const response = await fetch(endpoint,{
    method: 'GET'
  })
  const json = await response.json()
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

function Game() {
  const [guesses,setGuesses] = React.useState(emptyGuessesArr()); //initialized to 6 beginning
  const [attempts,setAttempts] = React.useState(0); 
  const [isCorrect,setIsCorrect] = React.useState(false);
  const [isGameOver,setIsGameOver] = React.useState(false);
  const [answer,setAnswer] = React.useState("");

  React.useEffect(() => {
    async function fetchWord() {
      const ans = await generateWord(ENDPOINT);
      setAnswer(ans.answer);
      console.log(ans.answer);
    }
    fetchWord()
    return(console.log("completed"))
  }, []);

  React.useEffect(() => {
    if(isCorrect){
      (console.log("woohoo"))
    }
  }, [isCorrect]);

  function handleAddGuess(guess){
    const newGuess= guess;
    var nextGuesses = new Array(6);

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

    setGuesses(nextGuesses);
    console.log(guesses,attempts);
    setAttempts(attempts+1);

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
    <GuessInput answer={answer} handleAddGuess={handleAddGuess} isCorrect={isCorrect} setIsCorrect={setIsCorrect} />
    }
    {(isCorrect||isGameOver)&&
    <Banner isCorrect={isCorrect} attempts={attempts} answer={answer}/>
    }
  </>
  )
}

export default Game;

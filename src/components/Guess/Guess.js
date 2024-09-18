import React from 'react';
import { checkGuess } from '/src/game-helpers.js';

//Processes Guess into Specific Row In Guess List
function Guess({guess,answer}) {

  //Check if Guess has not been given for this row yet
  if(guess==null||typeof guess==="object")
  {
    let emptyStrArr = [];
    for(let i=0;i<5;i++)
    {
      emptyStrArr[i]=' '
    }
    return(
    <p className="guess">
      {emptyStrArr.map((letter)=>{
        return(
        <span className="cell" key={Math.random()}>
          {letter}
        </span>
        )
      })}
    </p>
    );
  }
  //What to do if guess has been provided
  else
  {
    //Process Guess using function to get arr  then map over arr and return characters according to status
    const guessArr = checkGuess(guess,answer);
    return(
    <p className="guess">
      {guessArr.map((character)=>{
        return(
        <span className={`cell ${character.status}`} key={Math.random()}>
          {character.letter}
        </span>
        )
      })}
    </p>
    );
  }
}

export default Guess;

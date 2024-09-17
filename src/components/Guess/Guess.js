import React from 'react';
import { checkGuess } from '/src/game-helpers.js';

function Guess({guess,answer}) {
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
  else
  {
    const guessArr = checkGuess(guess,answer.answer);
    return(
    <p className="guess">
      {guessArr.map((character)=>{
        return(
        <span className={`cell ${character.status}`} key={Math.random()}>
          {console.log(character.letter,character.status,character)}
          {character.letter}
        </span>
        )
      })}
    </p>
    );
  }
}

export default Guess;

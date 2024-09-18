import React from 'react';
import Guess from '../Guess/Guess';

//Displays Guesses Array to DOM
function GuessList({guesses,answer}) {

  return(
    <div className='guess-results' id="guess-list">
      {guesses.map((guess)=>{
        return(
        <Guess guess={guess} answer={answer} key={Math.random()}/>
        )
      })}
    </div>
  )
}

export default GuessList;

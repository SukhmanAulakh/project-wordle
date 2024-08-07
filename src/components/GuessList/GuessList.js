import React from 'react';

function GuessList({guesses}) {
  return(
    <div className='guess-results' id="guess-list">
      {guesses.map((guess)=>{
        return(
        <p className="guess" key={Math.random()}>
          {guess}
        </p>
        )
      })}
    </div>
  )
}

export default GuessList;

import React from 'react';

function GuessInput({answer,handleAddGuess,isCorrect,setIsCorrect}) {

  const [guess,setGuess] = React.useState('')

  return (
      <form className="guess-input-wrapper"
        onSubmit={(event) => {
          event.preventDefault();

          const finalizedGuess = guess;

        if(finalizedGuess.length==5){
          if(finalizedGuess===answer){
            setIsCorrect(true);
            
          }
          handleAddGuess(finalizedGuess);
          setGuess('') //Reset Guess if Still Need More Attempts
        }
      }}>
        <label htmlFor="guess-input">
          Enter Guess:
        </label>
        <input 
          id="guess-input" 
          type="text"
          maxLength="5"
          minLength="5" 
          value={guess} 
          onChange={(event)=>(setGuess(event.target.value.toUpperCase()))}
        />
      </form>
  );
}

export default GuessInput;

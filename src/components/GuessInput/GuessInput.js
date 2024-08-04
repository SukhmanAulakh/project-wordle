import React from 'react';

function GuessInput({answer}) {

  const [guess,setGuess] = React.useState('')

  return (
    <form className="guess-input-wrapper" 
      onSubmit={(event) => {
        event.preventDefault();

        if(guess===answer){
          console.log("hurray!!!",guess,answer) //What to do if correct answer
        }
        else{console.log("nayy!!!",guess,answer)}
        setGuess('') //Reset Guess if Still Need More Attempts
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
        onChange={(event)=>(setGuess(event.target.value.toUpperCase()))
      }/>
    </form>
  );
}

export default GuessInput;

import React from 'react';

const ENDPOINT = "https://project-wordle-backend-deploy-e330c50ddfb0.herokuapp.com/word?word="

async function checkWord(word){

  if (typeof(word)=="string"){
    word =word.toLowerCase()
  }

  url= ENDPOINT+word

  const response = await fetch(url,{
    method: 'GET'
  })
  const json = await response.json()
  return (json)
}


function GuessInput({answer,handleAddGuess,setIsCorrect}) {

  const [guess,setGuess] = React.useState('')
  const [isValidWord,setIsValidWord] = React.useState("Empty")

  React.useEffect(() => {
    async function fetchWord(word) {
      const valid = await checkWord(word);
      if(valid.found==="True"){
        setIsValidWord("Valid")
        handleAddGuess(word);
        setGuess('') //Reset Guess if Still Have More Attempts and Not correct
        console.log(valid,"found")
      }
      else
      {
        setIsValidWord("Empty")
      }

    }
    if(isValidWord==="Check"){
      fetchWord(guess)
    }
    return(console.log("completed"))
  }, [isValidWord]);

  return (
      <form className="guess-input-wrapper"
        onSubmit={(event) => {
          event.preventDefault();
          const finalizedGuess = guess;

        if(finalizedGuess.length==5){

          setIsValidWord("Check")

          if(finalizedGuess===answer){
            setIsCorrect(true);
            handleAddGuess(finalizedGuess);
            console.log("guess input says you are correct!")
          }
          if(isValidWord=="Valid"){
            console.log("guess input says you are wrong!")
            handleAddGuess(finalizedGuess);
            setGuess('') //Reset Guess if Still Have More Attempts and Not correct
            setIsValidWord("Empty")
          }
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

import React from 'react';
import toast, {Toaster} from 'react-hot-toast';

//Check to See If Guess is A Word in the Backend
async function checkWord(word){
  
  if (typeof(word)=="string"){
    word =word.toLowerCase()
  }

  const ENDPOINT = "https://project-wordle-backend-deploy-e330c50ddfb0.herokuapp.com/word?word="
  const url= ENDPOINT+word

  const response = await fetch(url,{
    method: 'GET'
  })
  const json = await response.json()
  return (json)
}

//Handles the Input of Guesses
function GuessInput({answer,handleAddGuess,setIsCorrect}) {

  const [guess,setGuess] = React.useState('')
  const [isValidWord,setIsValidWord] = React.useState("Empty")

  React.useEffect(() => {
    async function handleWord(word) {
      //Check backend
      const valid = await checkWord(word);

      //Check If Word Was Found In Backend
      if(valid.found==="True"){
        setIsValidWord("Valid")
        handleAddGuess(word);
        toast.success('Keep Guessing!')

        //Reset Guess
        setGuess('')
      }
      else
      {
        //Change State Variable to be in an Empty State for Logic
        toast.error('Invalid Word!')
        setIsValidWord("Empty")
      }

    }

    //Determine if Word Check Needs To Be Performed
    if(isValidWord==="Check"){
      handleWord(guess)
    }
  
  //Render on isValidWord State Change
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
          }
          if(isValidWord=="Valid"){

            handleAddGuess(finalizedGuess);
            setGuess('') //Reset Guess if Still Have More Attempts and Not correct
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

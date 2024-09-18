import React from 'react';

function Banner({isCorrect,attempts,answer}) {
  //Check if word has been found after attempts exhausted
  if(isCorrect)
  {
    //Show happy banner if word found
    return(
      <div className="happy banner">
        <p>
          <strong>Congratulations!</strong> got it in 
          <strong> {attempts} guess{attempts>1&&'es'}</strong>
        </p>
      </div>
    );
  }
  else{
    //Show sad banner if word not guessed
    return(
      <div className="sad banner">
        <p>Sorry, the correct answer is <strong>{answer}</strong>.</p>
    </div>
    );
  }
}

export default Banner;

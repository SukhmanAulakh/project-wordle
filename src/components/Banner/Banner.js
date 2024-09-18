import React from 'react';

function Banner({isCorrect,attempts,answer}) {
  if(isCorrect)
  {
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
    return(
      <div className="sad banner">
        <p>Sorry, the correct answer is <strong>{answer}</strong>.</p>
    </div>
    );
  }
}

export default Banner;

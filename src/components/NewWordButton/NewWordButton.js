import React from 'react';

function NewWordButton({children}) {

  return (
    <button className="button"
      label="New Word Button"
      alt="Button Used For Generating New Word After Game Over"
      onClick={()=>{location.reload()}}  
    >
        {children}</button>
  );
}

export default NewWordButton;

import React, { useRef } from 'react';
import './AddMovie.css';

const AddMovie = (props) => {


 
    const titleText= useRef(null)
    const openingText= useRef(null)
    const releaseText= useRef(null)
    async function FormSubmitHandler(event){
        event.preventDefault();
        const movie = {
            title : titleText.current.value,
            openingText : openingText.current.value,
            releaseText : releaseText.current.value,
        }
      
     
  }
 
  
    
   
  return (
    <div>
        <form className='form' onSubmit={FormSubmitHandler}>
          <p className='add'>Title</p>
          <input className='inp' type="text" ref={titleText}/>
          <p className='add'>Opening Text</p>
          <textarea className='inp' type='text' ref={openingText} />
          <p className='add'>Release Date</p>
          <input className='inp' type="text" ref={releaseText}/>
          <button className='ad' type='submit'>Add Movie</button>
        </form>
    </div>
  )
  }

export default AddMovie
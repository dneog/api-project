import React from 'react'

const MovieList = ({movies}) => {
  return (
    <div className='content'>
        <p className='title'>{movies.title}</p>
        <p className='description'>{movies.openingText}</p>
    </div>
  )
}

export default MovieList
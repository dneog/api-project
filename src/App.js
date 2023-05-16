
import { useState } from 'react';
import './App.css';
import MovieList from './MovieList';

function App() {
  const [movies, setMovies] = useState([]);
  async function handleMovies(){
    const response = await fetch('https://swapi.py4e.com/api/films/');
    const data = await response.json();

    const movieList = data.results.map((movieData)=> {
      return {
        id: movieData.episode_id,
        title: movieData.title,
        openingText: movieData.opening_crawl,
        releaseDate: movieData.release_date,
      }
    })
    setMovies(movieList)
  }
  
  
  return (
    <div className="App">
    <section className='sectionOne'>
    <button onClick={handleMovies}>Fetch Movies</button>
    </section>
    <section className='sectionTwo'>
    {movies.map((movie)=> (
      <MovieList movies= {movie} />
    ))}
      
    </section>

    </div>
  );
}

export default App;

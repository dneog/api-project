
import { useState } from 'react';
import './App.css';
import MovieList from './MovieList';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading]= useState(false);

  async function handleMovies(){
    setIsLoading(true)
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
    setIsLoading(false)
  }
  
  
  return (
    <div className="App">
    <section className='sectionOne'>
    <button onClick={handleMovies}>Fetch Movies</button>
    </section>
    <section className='sectionTwo'>
    {isLoading && <p>Loading...</p>}
    {!isLoading && movies.map((movie)=> (
      <MovieList movies= {movie} />
    ))}
      
    </section>

    </div>
  );
}

export default App;

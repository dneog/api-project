
import { useEffect, useState } from 'react';
import './App.css';
import MovieList from './MovieList';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading]= useState(false);
  const [error, setError]= useState(null);
  const [retry, setRetry]= useState(0);
  const [dataRetry, setDataRetry]= useState(true)
  const [userData, setUserData]= useState(null)
 
  useEffect(()=> {
    if(userData=== null){

    
    handleMovies()
    }
  }, [retry])

    async function handleMovies(){
      setIsLoading(true);
      setError(null);
      try{
        const response = await fetch('https://swapi.py4e.com/api/film/');
        if(!response.ok){
          throw new Error('Something went wrong ...Retrying')
        }
        const data = await response.json();
        setUserData(data)
       
    
        const movieList = data.results.map((movieData)=> {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate: movieData.release_date,
          }
        })
        setMovies(movieList)
        
  
      }catch(error){
        if(dataRetry){

        
        setError(error.message)
        retryData();
        }else{
         
        }
      }
      setIsLoading(false)
      
    }

  function handleRetry(){
   setDataRetry(false)
  }

  const retryData=()=> {
    setTimeout(()=> {
      setRetry(retry+1)
    }, 5000)
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
    {!isLoading && error && <p>{error}</p> }
    {retry && <button onClick={handleRetry}>Cancel Retrying</button>}
      
    </section>

    </div>
  );
}

export default App;

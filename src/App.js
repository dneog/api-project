
import { useCallback, useEffect, useState } from 'react';
import './App.css';
import MovieList from './MovieList';
import AddMovie from './AddMovie';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading]= useState(false);
  const [error, setError]= useState(null);
  const [retry, setRetry]= useState(0);
  const [dataRetry, setDataRetry]= useState(true)
  const [userData, setUserData]= useState(null)
 
  // useEffect(()=> {
  //   if(userData=== null){
  //   handleMovies()
   
  //   }
  // }, [retry])

 async function addMovieHandler(movie){
    const response= await fetch('https://simple-crud-4c559-default-rtdb.firebaseio.com/movies.json', {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-Type': 'application/json'
      } 
     });
     const data= await response.json()
  }



     const handleMovies= useCallback(async ()=> {
      setIsLoading(true);
      setError(null);
      try{
        const response = await fetch('https://simple-crud-4c559-default-rtdb.firebaseio.com/movies.json');
        if(!response.ok){
          throw new Error('Something went wrong ...Retrying')
        }
        const data = await response.json();
       
       
        const loadedMovies= []
        for(const key in data){
          loadedMovies.push({
            id: key,
            title: data[key].title,
            openingText: data[key].openingText,
            releaseDate: data[key].releaseDate
          })
        }
    
        // const movieList = data.map((movieData)=> {
        //   return {
        //     id: movieData.episode_id,
        //     title: movieData.title,
        //     openingText: movieData.opening_crawl,
        //     releaseDate: movieData.release_date,
        //   }
        // })
        setMovies(loadedMovies)
        
  
      }catch(error){
        if(dataRetry){

        
        setError(error.message)
        retryData();
        }else{
         
        }
      }
      setIsLoading(false)
      
     })

  function handleRetry(){
   setDataRetry(false)
  }

  const retryData=()=> {
    setTimeout(()=> {
      setRetry(retry+1)
    }, 5000)
  }

  function handleDelete(id){
    fetch('https://simple-crud-4c559-default-rtdb.firebaseio.com/movies.json', {
      method: 'POST',
     
      
     }).then(response => {
      if(response.ok){
        setMovies(data => data.filter(item => item.id !== id))
      }else{
        console.log('Error')
      }
     })
  }
  
  return (
    <div className="App">
    <AddMovie AddMovie={addMovieHandler} />
    <section className='sectionOne'>
    <button onClick={handleMovies}>Fetch Movies</button>
    </section>
    <section className='sectionTwo'>
    {isLoading && <p>Loading...</p>}
    {!isLoading && movies.map((movie)=> (
     <div>
     <div className='content'>
        <p className='title'>{movie.title}</p>
        <p className='description'>{movie.openingText}</p>
        <button className='del'onClick={()=> handleDelete(movie.id)} >Delete</button>
    </div>
     </div>
      
    ))}
    {!isLoading && error && <p>{error}</p> }
    {error && dataRetry && <button onClick={handleRetry}>Cancel Retrying</button> }
   
      
    </section>

    </div>
  );
}

export default App;

import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Card from './Components/Cards/Card';
import { useEffect, useState } from 'react';

function App() {
  const [movie, setMovie] = useState([])
  const [search, setSearch] = useState('')
  const [movieWatched, setMovieWatched] = useState(true)
  const [moviedetails,setMovieDetails] = useState(false)
  const [watchingList,setWatchingList] = useState([])
  const [movieObj, setMovieObj] = useState({})
  // const [pages, setPages] = useState(0)
  // const [pagesButton, setPagesButton] = useState([])
  useEffect(() => {
    const fetchApi = async (search) => {
      try {
        if (search) {
          const response = await fetch(`https://www.omdbapi.com/?s=${search}&&apikey=99e183dc&&page=1`)
          const result = await response.json()
          const length = result.totalResults
          setMovie(result.Search)
          // setPages(Math.ceil(length / 10))
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchApi(search)
  }, [search])
  return (
    <div className='main'>
      <Navbar
        search={search}
        setSearch={setSearch}
        movie={movie}
      />
      <Card
        movie={movie}
        setMovie={setMovie}
        search={search}
        movieWatched={movieWatched}
        setMovieWatched={setMovieWatched}
        moviedetails={moviedetails}
        setMovieDetails={setMovieDetails}
        movieObj={movieObj}
        setMovieObj={setMovieObj}
        watchingList={watchingList}
        setWatchingList={setWatchingList}
      />
    </div>
  );
}

export default App;

import React from 'react'
import MovieList from '../MovieList/MovieList'
import MovieWatched from '../MovieWatched/MovieWatched'
import './Card.css'
const Card = ({ movie, setMovie, search, movieWatched, setMovieWatched, movieObj, setMovieObj,moviedetails,setMovieDetails,watchingList,setWatchingList }) => {
  return (
    <div className='moviedetails'>
      <MovieList
        movie={movie}
        setMovie={setMovie}
        search={search}
        movieWatched={movieWatched}
        setMovieWatched={setMovieWatched}
        movieObj={movieObj}
        setMovieObj={setMovieObj}
        moviedetails={moviedetails}
        setMovieDetails={setMovieDetails}
      />
      <MovieWatched
        movieWatched={movieWatched}
        setMovieWatched={setMovieWatched}
        moviedetails={moviedetails}
        setMovieDetails={setMovieDetails}
        watchingList={watchingList}
        setWatchingList={setWatchingList}
        movieObj={movieObj} />
    </div>
  )
}

export default Card

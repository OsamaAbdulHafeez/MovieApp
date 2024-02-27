import React, { useState } from 'react'
import './moviewatched.css'
import hash from '../../Images/hash.png'
import star from '../../Images/star.png'
import Timer from '../../Images/Timer.png'
import { FaStar } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { FaLongArrowAltLeft } from "react-icons/fa";
const MovieWatched = ({ movieWatched, setMovieWatched, movieObj, moviedetails, setMovieDetails, watchingList, setWatchingList }) => {
  const [watchRating, setWatchRating] = useState(null)
  const [watchTiming, setWatchTiming] = useState(null)
  const [starRating, setStarRating] = useState(null)
  const [yourated , setYouRated] = useState(null)
  const addMovie = async (object) => {
    object.movieRated = starRating
    console.log(object)
    const watchingListcopy = [...watchingList]
    watchingListcopy.push(object)
    setWatchingList(watchingListcopy)
    setMovieDetails(false)
    setMovieWatched(true)
    setWatchRating((prev) => prev + (object.imdbRating * 1))
    const movieTime = object.Runtime.split(" ")
    setWatchTiming((prev) => prev + (movieTime[0] * 1))
    console.log(watchTiming + (movieTime[0] * 1))
    setYouRated((prev) => prev + starRating)
    // setWatchTiming((prev)=>prev?prev:0 + movieTime[0]*1)
  }
  const exit = () => {
    setMovieDetails(false)
    setMovieWatched(true)
  }
  const cutmovie = (id) => {
    const deleteMovieIndex = watchingList.findIndex(element => {
      return element.imdbID === id
    })
    const deleteMovie = watchingList.find(element => {
      return element.imdbID === id
    })
    console.log(deleteMovie.imdbRating)
    const watchingListcopy = [...watchingList]
    watchingListcopy.splice(deleteMovieIndex, 1)
    setWatchingList(watchingListcopy)
    setWatchRating((prev) => prev - (deleteMovie.imdbRating * 1))
    setYouRated((prev) => prev - deleteMovie.movieRated)
    const movieTime = deleteMovie.Runtime.split(" ")
    setWatchTiming((prev) => prev - (movieTime[0] * 1))
  }
  return (
    <div className='watchListMain'>
      {movieWatched && <div className='moviewatched'>
        <div id="youwatached">
          <h2>Movies you watched</h2>
          <div className='watchedinfo'>
            <span id='hash'>
              <img src={hash} alt="" />{watchingList.length} Movies
            </span>
            <span>
              <img src={star} alt="" />{watchRating
               ? watchingList.length > 0 ? (watchRating / watchingList.length).toFixed(2) : "0.0"
                : "0.0"}
            </span>
            <span>
              <img src={star} alt="" />{yourated
                ? watchingList.length > 0 ? (yourated / watchingList.length).toFixed(2) : "0.0"
                : "0.0"}
            </span>
            <span>
              <img src={Timer} alt="" />{watchTiming
                ? watchingList.length > 0 ? (watchTiming / watchingList.length).toFixed(2) : "0.0"
                : "0.0"} min
            </span>
          </div>
        </div>
        {/* WATCHING LIST */}
        <div className='watchingList'>
          {watchingList && watchingList.map((watch, index) => (
            <div id='watching'>
              <div className='watchPoster'>
                <div style={{ height: "60px", width: "50px" }}>
                  <img src={watch.Poster} alt="" />
                </div>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
                  <h4>{watch.Title}</h4>
                  <div className='watchedinfo' style={{ gap: "20px" }}>
                    <span><img src={star} alt="" />{watch.imdbRating}</span>
                    <span><img src={star} alt="" />{watch.movieRated}</span>
                    <span><img src={Timer} alt="" />{watch.Runtime}</span>
                  </div>
                </div>
              </div>
              <button onClick={() => cutmovie(watch.imdbID)}>
                <RxCross2 />
              </button>
            </div>
          ))}
        </div>
      </div>}



      {moviedetails && <div id='moviedetails'>
        <button id='arrow' onClick={exit}><FaLongArrowAltLeft /></button>
        <div className='poster'>
          <div id='posterimg'>
            <img src={movieObj.Poster} />
          </div>
          <div id='title'>
            <h1>{movieObj.Title}</h1>
            <p>{movieObj.Released} . {movieObj.Runtime}</p>
            <p>{movieObj.Genre}</p>
            <p><img src={star} />{movieObj.imdbRating} IMDb rating</p>
          </div>
        </div>
        <div className='ratingStar'>
          <div className='stars'>
            {[...Array(10)].map((star, index) => {
              const currentRating = index + 1
              return (
                <label>
                  <input type="radio" name='rating' value={currentRating} onClick={() => setStarRating(currentRating)} />
                  <FaStar id='star'
                    color={currentRating <= starRating ? "ffc107" : "grey"} />
                </label>
              )
            })
            }
          </div>
          <button onClick={() => addMovie(movieObj)}>Add to List</button>
        </div>
        <div className='moviedesc'>
          <p>{movieObj.Plot}</p>
          <p>{movieObj.Actors}</p>
          <p>Directed by {movieObj.Director}</p>
        </div>
      </div>}
    </div>
  )
}

export default MovieWatched

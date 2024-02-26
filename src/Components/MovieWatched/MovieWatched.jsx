import React, { useState } from 'react'
import './moviewatched.css'
import hash from '../../Images/hash.png'
import star from '../../Images/star.png'
import Timer from '../../Images/Timer.png'
import { FaStar } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { FaLongArrowAltLeft } from "react-icons/fa";
const MovieWatched = ({ movieWatched, setMovieWatched, movieObj, moviedetails, setMovieDetails, watchingList, setWatchingList }) => {
  const [watchRating, setWatchRating] = useState()
  const [watchTiming, setWatchTiming] = useState(0)
  const [starRating, setStarRating] = useState(null)
  const addMovie = async (object) => {
    object.movieRated = starRating
    console.log(object)
    const watchingListcopy = [...watchingList]
    watchingListcopy.push(object)
    setWatchingList(watchingListcopy)
    setMovieDetails(false)
    setMovieWatched(true)
    setWatchRating((prev) => prev ? prev : 0 + (object.imdbRating * 1))
    const movieTime = object.Runtime.split(" ")
    setWatchTiming((prev) => prev + (movieTime[0] * 1))
    console.log(watchTiming + (movieTime[0] * 1))
    setStarRating((prev) => prev ? prev : 0 + object.movieRated)
    // setWatchTiming((prev)=>prev?prev:0 + movieTime[0]*1)
  }
  const exit = () => {
    setMovieDetails(false)
    setMovieWatched(true)
  }
  const cutmovie = (id) => {
    const deleteMovie = watchingList.findIndex(element => {
      return element.imdbID === id
    })
    const watchingListcopy = [...watchingList]
    watchingListcopy.splice(deleteMovie, 1)
    setWatchingList(watchingListcopy)
  }
  return (
    <div className='watchListMain'>
      {movieWatched && <div className='moviewatched'>
        <div id="youwatached">
          <h2>Movies you watched</h2>
          <div className='watchedinfo'>
            <span id='hash'><img src={hash} alt="" />{watchingList.length} Movies</span>
            <span><img src={star} alt="" />{watchRating
              ? watchingList.length ? (watchRating / watchingList.length).toFixed(2) : "0.0"
              : "0.0"}</span>
            <span><img src={star} alt="" />{starRating
             ? starRating ? (starRating / watchingList.length).toFixed(2) : '0.0'
            : "0.0"}</span>
            <span><img src={Timer} alt="" />{watchTiming
              ? watchingList.length ? (watchTiming / watchingList.length).toFixed(2) : "0.0"
              : "0.0"} min</span>
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

            {/* <FaRegStar id='star' />
            <FaRegStar id='star' />
            <FaRegStar id='star' />
            <FaRegStar id='star' />
            <FaRegStar id='star' />
            <FaRegStar id='star' />
            <FaRegStar id='star' />
            <FaRegStar id='star' />
            <FaRegStar id='star' /> */}
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

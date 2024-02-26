import React from 'react';
import popcorn from '../../Images/popcorn.png'
import './Navbar.css'
const Navbar = ({search,setSearch,movie}) => {
  return (
    <div className='navbar'>
      <div className='logo'>
        <img src={popcorn} alt=''/>
        <h4>usePopcorn</h4>
      </div>
      <div className='search'>
        <input type='text' placeholder='Search movies...' onChange={(e)=>setSearch(e.target.value)}/>
      </div>
      <div className='result'>
        <h3>Found {movie ? movie.length:0} top results</h3>
      </div>
    </div>
  )
}

export default Navbar

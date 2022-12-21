import React from 'react'
import { useGlobalContext } from './context'
import { Link } from 'react-router-dom'
import SingleMovie from './SingleMovie'
const url =
  'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png'

const Movies = () => {
  const {movies,isLoading} = useGlobalContext()

  if(isLoading){
    return <div className="loading"></div>
  }
  return <section className='movies'>
    {movies.map((movie)=>{
      // return <SingleMovie key={movie.imdbID} {...movie}></SingleMovie>
      return <Link to={`/movies/${movie.imdbID}`} key={movie.imdbID} className='movie' >
        <article>
          <img src={movie.Poster === 'N/A'? url : movie.Poster} alt={movie.Title} />
          <div className="movie-info">
            <h4 className="title">{movie.Title}</h4>
            <p>{movie.Year}</p>
          </div>
        </article>
      </Link>
    })}
  </section>
}

export default Movies

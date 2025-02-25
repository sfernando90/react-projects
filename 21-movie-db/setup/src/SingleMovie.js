import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { API_ENDPOINT } from './context'

const SingleMovie = () => {
  const {id} = useParams()
  const [movie, setMovie] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState({msg:'',show: false})

  const fetchMovie = async (url) =>{
    const data = await fetch(url).then((response)=>response.json())
    if(data.Response === 'False'){
      setError({show:true, msg: data.Error})
      setIsLoading(false)
    }
    else{
      setMovie(data)
      setIsLoading(false)
    }
  }

  useEffect(()=>{
    const movieUrl = `${API_ENDPOINT}&i=${id}` 
    fetchMovie(movieUrl)
  },[id])

  if(isLoading){
    return <div className='loading'></div>
  }
  if(error.show){
    return <div className="page-error">
      <h1>{error.msg}</h1>
      <Link to='/' className='btn'>
        back to movies
      </Link>
    </div>
  }

  const {Poster:poster,Title:title,Plot:plot,Year,year} = movie
  return <section className="single-movie">
    <img src={poster} alt={title} />
    <div className="single-movie-info">
      <h2>{title}</h2>
      <p>{plot}</p>
      <h4>{year}</h4>
      <Link to='/' className='btn'>
        back to movies
      </Link>    </div>
  </section>
}

export default SingleMovie

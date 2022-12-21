import React, { useState, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import Photo from './Photo'
const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`
const mainUrl = `https://api.unsplash.com/photos/`
const searchUrl = `https://api.unsplash.com/search/photos/`

function App() {
  const [loading,setLoading] = useState(false)
  const [photos,setPhotos] = useState([])
  const [page,setPage] = useState(1)
  const [query, setQuery] = useState('')
  const [search, setSearch] = useState('')
  const [newSearch,setNewSearch] = useState(false)

  
  const fetchImages = async ()=>{
    setLoading(true)
    let url
    try {
      const urlQuery = '&query='+query
      const urlPage = '&page='+page
      if(query){
        url = searchUrl+clientID+urlPage+urlQuery
      }
      else{
        url = mainUrl+clientID+urlPage
      }

      const data = await fetch(url).then((response)=>response.json())
      setPhotos((oldPhotos)=>{
        if(query && page === 1){
          return data.results
        }
        else if(query){
          return [...oldPhotos,...data.results]
        }
        return [...oldPhotos,...data]
      })
      setLoading(false)

    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  }

  
  const handleSubmit = (e) =>{
    e.preventDefault()
    setQuery(search)
    if(!search) return
    if(page===1){
      setNewSearch(!newSearch)
    }
    else{
      setPage(1)
    }
  }

  useEffect(()=>{
    fetchImages()
    
  },[page,newSearch])

  useEffect(()=>{
    const event = window.addEventListener('scroll',()=>{
      if((!loading && window.innerHeight + window.scrollY)>=document.body.scrollHeight - 2){
        setPage(page+1)
      }
    },[])

    return ()=> window.removeEventListener('scroll', event)
  })
  return <main>
    <section className="search">
      <form action="" className="search-form">
        <input type="text" placeholder='search' className='form-input' value={search} onChange={(e)=>{setSearch(e.target.value)}} />
        <button type='submit' className='submit-btn' onClick={handleSubmit}>
          <FaSearch/>
        </button>
      </form>
    </section>
    <section className="photos">
      <div className="photos-center">
        {photos.map((image, index)=>{
          return <Photo key={index} {...image}></Photo>
        })}
      </div>
      {loading && <h2 className='loading'>Loading...</h2>}
    </section>
  </main>
}

export default App

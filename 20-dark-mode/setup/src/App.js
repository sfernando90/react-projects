import React, { useState, useEffect } from 'react'
import data from './data'
import Article from './Article'

const getStorageTheme = () =>{
  let theme = 'light-theme'
  if(localStorage.getItem('theme')){
    theme = localStorage.getItem('theme')
  }

  return theme
}

function App() {
  const[theme,setTheme]=useState('light-theme')

  useEffect(()=>{
    document.documentElement.className = theme
    localStorage.setItem('theme', theme)
  },[theme])

  const toggleTheme = () =>{
    if(theme === 'light-theme') setTheme('dark-theme')
    else if(theme === 'dark-theme') setTheme('light-theme')
  }
  return <main>
    <nav>
      <div className="nav-center">
        <h1>overreacted</h1>
        <button className="btn" onClick={toggleTheme}>toggle</button>
      </div>
    </nav>
    <section className="articles">
      {data.map((item)=>{
        return <Article key={item.id} {...item}></Article>
      })}
    </section>
  </main>
}

export default App

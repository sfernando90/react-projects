import React, { useState, useRef, useEffect } from 'react'
import { useGlobalContext } from './context'


const Submenu = () => {
  const {isSubmenuOpen, location, page:{page,links}} = useGlobalContext()
  const [columns, setColums] = useState('col-2')
  const container = useRef(null)
  useEffect(()=>{
    setColums('col-2')
    const submenu = container.current
    const {center,bottom} = location
    submenu.style.left = `${center}px`
    submenu.style.top = `${bottom}px`

    if(links.length === 3){
      setColums('col-3')
    }
    if(links.length > 3){
      setColums('col-4')
    }
  },[location],[links])
  return <aside ref={container} className={`submenu ${isSubmenuOpen && 'show'}`} >
    <h4>{page}</h4>
    <div className={`submenu-center ${columns}`}>
      {links.map((link, index)=>{
        const {label,icon, url}=link
        return <a href={url} key={index}>{icon}{label}</a>
      })}
    </div>
  </aside>
}

export default Submenu

import React, { useState, useEffect } from 'react'
import rgbToHex from './utils'

const SingleColor = ({rgb, weight, index}) => {
  const [alert,setAlert] = useState(false)
  const bcg = rgb.join(',')
  const copyToClipboard = () =>{
    setAlert(true)
    navigator.clipboard.writeText(rgbToHex(...rgb))
  }

  useEffect(()=>{
    const timeout = setTimeout(()=>{
      setAlert(false)
    },3000)
    return ()=> clearTimeout(timeout)
  },[alert])

  return (
    <article className={`color ${index>10 && 'color-light'}`} 
    style={{backgroundColor : `rgb(${bcg})`}} onClick={()=>copyToClipboard()} >
      <p className='percent-value'>{weight}%</p>
      <p className='color-value'>{rgbToHex(...rgb)}</p>
      {alert && <p className='alert'>copied to clipboard</p>}
    </article>
  )
}

export default SingleColor

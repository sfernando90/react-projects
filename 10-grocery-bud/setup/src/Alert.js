import React, { useEffect } from 'react'

const Alert = ({type,msg,showAlert, list}) => {
  useEffect(()=>{
    const timeOut = setTimeout(()=>{
      //calling it with no parameters to remove alert
      showAlert()
    },3000)
    return ()=> clearTimeout(timeOut)
  },[list])
  return <p className={`alert alert-${type}`}>{msg}</p>
}

export default Alert

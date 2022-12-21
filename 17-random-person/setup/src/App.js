import React, { useState, useEffect } from 'react'
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from 'react-icons/fa'
const url = 'https://randomuser.me/api/'
const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg'
function App() {
  const [loading, setLoading] = useState(true)
  const [person, setPerson] = useState(null)
  const [title, setTitle] = useState('name')
  const [value, setValue] = useState('random person')

  const getPerson = async () =>{
    const response = await fetch(url)
    const data = await response.json()
    const person = data.results[0]
    const {phone,email} = person
    const {password} = person.login
    const {large:image} = person.picture
    const {first,last} = person.name
    const {age} = person.dob
    const {number:streetNum, name:streetName}= person.location.street

    const newPerson ={
      image,phone,email,password,age, name: first+" "+last, address: streetNum+' '+ streetName, 
    }

    setPerson(newPerson)
    setLoading(false)
    setTitle('name')
    setValue(newPerson.name)
    
  }

  useEffect(()=>{
    getPerson()
  },[])
  const handleValue = (e)=>{
    if(e.target.classList.contains('icon') && person){
      const newValue = e.target.dataset.label
      setTitle(newValue)
      setValue(person[newValue])
    }
    
  }


  return <main>
    <div className="block bcg-black"></div>
    <div className="block">
      <div className="container">
        <img src={(person?.image) || defaultImage} alt="random user" className='user-img' />
        <p className='user-title'>my {title} is</p>
        <p className='user-value'>{value}</p>
        <div className="values-list">
          <button className='icon' data-label='name' onMouseOver={handleValue}><FaUser></FaUser></button>
          <button className='icon' data-label='email' onMouseOver={handleValue}><FaEnvelopeOpen></FaEnvelopeOpen></button>
          <button className='icon' data-label='age' onMouseOver={handleValue}><FaCalendarTimes></FaCalendarTimes></button>
          <button className='icon' data-label='address' onMouseOver={handleValue}><FaMap></FaMap></button>
          <button className='icon' data-label='phone' onMouseOver={handleValue}><FaPhone></FaPhone></button>
          <button className='icon' data-label='password' onMouseOver={handleValue}><FaLock></FaLock></button>
        </div>
        <button className='btn' type='button' onClick={getPerson}>
          {loading? 'loading...' : 'random user'}
        </button>
      </div>
    </div>
  </main>
}

export default App

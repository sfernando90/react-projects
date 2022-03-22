import React, { useState, useEffect } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { FaQuoteRight } from 'react-icons/fa';
import data from './data';
function App() {
  const [people, setPeople] = useState(data)
  const [index, setIndex] = useState(0)

  // useEffect(()=>{
  //   const lastIndex = people.length-1;S
  //   if(index<0){
  //     setIndex(lastIndex)
  //   }
  //   if(index > people.length-1){
  //     setIndex(0)
  //   }
  // },[index,people])

  const checkIndex = (index) =>{
    const lastIndex = people.length-1;
    if(index<0){
      return lastIndex
    }
    if(index > people.length-1){
      return 0
    }
    
    return index;
  }

  useEffect(()=>{
    let slider = setInterval(()=>{
      setIndex(index+1)
    },5000)
    return ()=>clearInterval(slider)
  },[index])

  return (
    <section className='section'>
      <div className='title'>
        <h2>
          <span>/</span>reviews
        </h2>
      </div>
      <div className='section-center'>
        {people.map((person, personIndex)=>{
          const {id,image,name,title,quote} = person
          let position = 'nextSlide'
          if(index === personIndex){
            position = 'activeSlide'
          }
          if(personIndex=== index-1 || (index===0 && personIndex === people.length -1)){
            position='lastSlide'
          }
          return (
            <article key={id} className={position}>
              <img src={image} alt={name} className='person-img'/>
              <h4>{name}</h4>
              <p className='title'> {title}</p>
              <p className='text'> {quote}</p>
              <FaQuoteRight className='icon'></FaQuoteRight>
            </article>
          )
        })}
        <button className='prev' onClick={()=>setIndex(checkIndex(index-1))}><FiChevronLeft></FiChevronLeft> </button>
        <button className='next' onClick={()=>setIndex(checkIndex(index+1))}> <FiChevronRight></FiChevronRight></button>
      </div>
    </section>
  );
}

export default App;

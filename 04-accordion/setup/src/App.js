import React, { useState } from 'react';
import questions from './data';
import data from './data';
import Question from './Question';
import SingleQuestion from './Question';
function App() {
  return (
    <main>
      <div className='container'>
        <h3>questions and answers about login</h3>
        <section className='info'>
          {
            questions.map((question)=>{
              return <SingleQuestion key={question.id} {...question}></SingleQuestion>
            })
          }
        </section>
      </div>
    </main>
  )
}

export default App;

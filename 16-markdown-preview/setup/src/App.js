import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import {render} from 'react-dom'

function App() {
  const [markdown, setMarkdown] = new useState('## markdown preview')
  return (<main>
    <section className='markdown'>
      <textarea className='input' value={markdown} onChange={(e)=> setMarkdown(e.target.value)}></textarea>
      <article className='result'><ReactMarkdown>{markdown}</ReactMarkdown></article>
    </section>
  </main>)
}

export default App

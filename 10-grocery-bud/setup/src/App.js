import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const getLocalStorage = () =>{
  let list = localStorage.getItem('list')
  if(list){
    return JSON.parse(list)
  }
  else{
    return []
  }
}

function App() {
  const [name,setName] = useState('')
  const [list,setList] = useState(getLocalStorage())
  const [isEditing,setIsEditing] = useState(false)
  const [editId,setEditId] = useState(null)
  const [alert,setAlert] = useState({show: false, msg:'',type:''})

  const handleSubmit = (e) =>{
    e.preventDefault()
    if(!name){
      showAlert(true,'danger','please enter value')
    }
    else if(name && isEditing){
      //deal with edit
      setList(list.map((item)=>{
        if(item.id === editId){
          return {...item, title:name}
        }
        return item
      }))
      setName('')
      setEditId(null)
      setIsEditing(false)
      showAlert(true,'success', 'item name changed')
    }
    else{
      //show alert
      showAlert(true, 'success', 'item added to the list')
      const newItem = {id: new Date().getTime().toString(), title:name}
      setList([...list,newItem])
      setName('')
    }
  }

  const showAlert =(show=false, type='', msg='') =>{
    setAlert({show,type,msg})

  }

  const clearList = () =>{
    showAlert(true,'danger','items cleared')
    setList([])
  }

  const removeItem=(id)=>{
    showAlert(true,'danger','item removed')
    let newList = list.filter((item)=> item.id !== id)
    setList(newList)
  }
  const editItem = (id)=>{
    const oldItem = list.find((item)=>{
     return item.id === id
    })
    setIsEditing(true)
    setEditId(id)
    setName(oldItem.title)
    console.log(oldItem)
  }

  useEffect(()=>{
    localStorage.setItem('list',JSON.stringify(list))
  },[list])

  return (
    <section className='section-center' >
      <form className='grocery-form' onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} showAlert={showAlert} list={list} ></Alert>}
        <h3>grocery bud</h3>
        <div className="form-control">
          <input type="text" className='grocery' placeholder='e.g eggs' 
          value={name} onChange={(e)=>setName(e.target.value)} />
          <button type='submit' className='submit-btn'>{isEditing? 'edit' : 'submit'}</button>
        </div>
      </form>
      {list.length > 0 &&
        <div className='grocery container'>
          <List items={list} removeItem={removeItem} editItem={editItem}></List>
          <button className='clear-btn' onClick={()=>clearList()}>clear items</button>
        </div>
      }
      
    </section>
    
  )
}

export default App

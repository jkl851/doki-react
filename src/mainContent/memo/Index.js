import './Index.css';
import Header from './Header'
import Createnote from './Createnote'
import Note from './Note'
import React,{useState} from 'react'

export default function App() {
  const [addItem,setAddItem] = useState([])
  const addNote = (note) => {
    setAddItem((preValue) => {
      return[
        ...preValue,note
      ]
    })

    if(note.title === '' || note.content === ''){
      alert('제목이나 본문을 기입하세요')
      setAddItem([])
    }
  }
  
  const onDelete = (id) => {
    setAddItem( (oldData) => {
     return oldData.filter( (currentValue,indx) => {
        return indx !== id
      })
    })
  }

  return (
   
      <div className="container">
        <Header />
        <div className="main_note">
          <Createnote passNote = {addNote}/>

{          addItem.map( (value,index) => {
            return(
              <Note
                key={index}
                id={index}
                titles={value.title}
                contents={value.content}
                deleteItem={onDelete}
              />
            )
            })
}
        </div>
      </div>
  
  );
}


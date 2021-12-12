import './Index.css';
import Header from './Header'
import CreateMemo from './Creatememo'
import Memo from './Memo'
import React,{useState} from 'react'

export default function App() {
  const [addItem, setAddItem] = useState([]);

  const addMemo = (memo) => {
    setAddItem((preValue) => {
      return[
        ...preValue, memo
      ]
    })

    if(memo.title === '' || memo.content === ''){
      alert('제목이나 본문을 기입하세요')
      setAddItem([])
    }
  }

  const onDelete = (id) => {
    setAddItem( (oldData) => {
     return oldData.filter( (currentValue, indx) => {
        return indx !== id
      })
    })
  }

  return (
   
      <div className="container">
        <div className="main_note">
          <CreateMemo 
                  passMemo = {addMemo}
                  />
{          addItem.map( (value, index) => {
            return(
              <Memo
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


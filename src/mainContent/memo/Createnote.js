import React,{useState} from 'react'
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';



export default function(props) {

    const [expend, setExpend] = useState(false)
    const [note, setnote] = useState({
        title:"",
        content:""
    })

    const InputEvent = (event) => {
        const value = event.target.value
        const name = event.target.name

        setnote( (prevValue) => {
            return{
                ...prevValue,
                [name]:value
            }
        })
    }

    const addEvent = () => {
        props.passNote(note)
        setnote({
            title:"",
            content:""
        })
    }

    const expendIt = () => {
        setExpend(true)
    }
    const collapseIt = () => {
        setExpend(false)
    }
    return(
        <div>
           
                <form onMouseLeave={collapseIt}>
                    <div className="input_wrapper">
                    {   expend ?
                    <input 
                    type="text"
                    placeholder="제목" 
                    className="title_input"
                    value={note.title}
                    name = "title"
                    onChange={InputEvent}
                    /> : null
                    }

                    <textarea 
                    placeholder="본문" 
                    rows="6" 
                    column="20"
                    className="descroption_input"
                    value={note.content}
                    name="content"
                    onChange={InputEvent}
                    onMouseEnter={expendIt}
                    ></textarea>

                    {  expend?
                    <div>
                    <Button className="addButton" onClick={addEvent}>
                        <AddIcon className="add-icon"/>
                    </Button>
                    <Button className="addButton" onClick={addEvent}>
                        <AddIcon className="add-icon"/>
                    </Button>
                    </div>
                     : null
                    }
                    </div>
                </form>
                
        </div>
    )
}
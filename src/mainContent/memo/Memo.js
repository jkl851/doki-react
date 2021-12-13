import React from 'react'
import Button from '@mui/material/Button';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';


export default function(props) {
    const deleteMemo = () => {
        props.deleteItem(props.id)
    }
    return(
        <>
            <div className="memo">
                <h2 className="memo-title">{props.titles}</h2>
                <div className="memo-area">
                <span className="memo-description">
                    {props.contents}
                </span>
                </div>
                
                <Button className="delete-button" onClick={deleteMemo}>
                    <DeleteOutlineIcon className="delete-icon"/>
                </Button>
            </div>
        </>
    )
}
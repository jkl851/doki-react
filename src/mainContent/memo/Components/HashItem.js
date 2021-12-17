import React, {useState} from 'react';

const HashItem = ({no, name, checked, setAllHashDatas}) => {
    
    const checkHandler = () => {
        setAllHashDatas((datas) => {
            return datas.map((data) => {
                no === data.no ? 
                    data.checked = !data.checked : 
                    true;
                return {
                    no: data.no,
                    name: data.name,
                    checked: data.checked
                }
            })
        })
    };
    return (
        <div style={{padding:'1px 1px', display:'block', width: '100%', height:'30px'}}>
            <input onChange={checkHandler} id={no} checked={checked} style={{marginLeft:'5px', float:'left', width: '10%', height:'90%'}} type="checkbox"></input>
            <label id={no} style={{marginLeft:'5px', textAlign:'left', float:'left', width: '80%', height:'90%'}}>{name}</label>
        </div>
    );
};

export default HashItem;
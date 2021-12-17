import React from 'react';

const HashItem = ({no, name}) => {
    return (
        <div style={{padding:'1px 1px', display:'block', width: '100%', height:'30px'}}>
            <input style={{marginLeft:'5px', float:'left', width: '10%', height:'90%'}} type="checkbox"></input>
            <label id={no} style={{marginLeft:'5px', textAlign:'left', float:'left', width: '80%', height:'90%'}}>{name}</label>
        </div>
    );
};

export default HashItem;
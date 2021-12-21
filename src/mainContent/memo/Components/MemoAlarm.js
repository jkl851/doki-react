import React, { Fragment, useContext } from "react";
import { MemoContext} from "../modules/MemoReducer";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';

export default function MemoAlarm({memo, InputEvent, isPosted}) {
    const [ memos, dispatch ] = useContext(MemoContext);
    return (
        <Fragment>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="알람"
                    inputFormat={"yyyy-MM-dd hh:mm"}
                    value={memo.alarm}
                    onChange={ isPosted === true ? 
                        (e) => dispatch({ type: 'MODIFY_MEMO', no: memo.no, name : "alarm", value : e }) 
                        : 
                        (e)=>{ InputEvent('memoAlarmTime', e) } }
                />
                </LocalizationProvider>
               
                 { memo.checked == '0' ? 
                 (
                    <Fragment>
                    <Checkbox   checked={false}
                                inputProps={{'checked' : '1'}} 
                                onChange={isPosted === true ? 
                                    (e) => dispatch({ type: 'MODIFY_MEMO', no: memo.no, name : "checked", value : '1' })
                                    :
                                    (e)=>{ InputEvent('checked', '1')} }
                                
                                />
                                <span>알람 설정</span>
                    </Fragment>
                ) : (
                    <Fragment>
                    <Checkbox   checked={true}
                                inputProps={{'checked' : '0'}}
                                onChange={isPosted === true ? 
                                    (e) => dispatch({ type: 'MODIFY_MEMO', no: memo.no, name : "checked", value : '0' })
                                    :
                                    (e)=>{ InputEvent('checked', '0')} }
                                
                                 />
                                <span>알람 설정</span>    
                    </Fragment> 
                    )
                 } 
            </Fragment>
    );
};


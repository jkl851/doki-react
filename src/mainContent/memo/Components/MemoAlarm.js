import React, { Fragment, useContext } from "react";
import { MemoContext} from "../modules/MemoReducer";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import dayjs from 'dayjs';

export default function MemoAlarm({memo, InputEvent, isPosted, allinfo}) {
    const [ memos, dispatch ] = useContext(MemoContext);

    const changAlarmHandler = (e) => {
        isPosted === true ? 
            dispatch({ type: 'MODIFY_MEMO_SELF', no: memo.no, name : "alarm", value : dayjs(e).format("YYYY-MM-DD hh:mm") , allinfo: allinfo}) 
            : 
            InputEvent('alarm', dayjs(e).format("YYYY-MM-DD hh:mm"))
    } 

    const changCheckHandler = (e) => {
        if( (memo.checked === '0') || (memo.checked === null) ) {
            isPosted === true ? 
                    dispatch({ type: 'MODIFY_MEMO_SELF', no: memo.no, name : "checked", value : '1', allinfo: allinfo })
                    :
                    InputEvent('checked', '1') 
        } else {
            isPosted === true ? 
                    dispatch({ type: 'MODIFY_MEMO_SELF', no: memo.no, name : "checked", value : '0' , allinfo: allinfo })
                    :
                    InputEvent('checked', '0') 
        }
    }

    return (
        <Fragment>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="알람"
                    inputFormat={"yyyy-MM-dd hh:mm"}
                    value={memo.alarm}
                    onChange={ changAlarmHandler }
                />
                </LocalizationProvider>
               
            
                <Fragment>
                <Checkbox   checked={memo.checked === '0'|| false }
                            inputProps={{'checked' : '0'}}
                            onChange={changCheckHandler}
                            
                                />
                            <span>알람 설정</span>    
                </Fragment>
                 
            </Fragment>
    );
};


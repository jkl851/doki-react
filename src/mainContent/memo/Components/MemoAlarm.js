import React, { useContext } from "react";
import { MemoContext} from "../modules/MemoReducer";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import TextField from '@mui/material/TextField';

export default function MemoAlarm({cmemo, InputEvent}) {

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="알람"
                inputFormat={"yyyy-MM-dd hh:mm"}
                value={cmemo.time}
                onChange={ (e)=>{ InputEvent('time', e) } }
            />
        </LocalizationProvider>
    );
};


import React, {useState} from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import TextField from '@mui/material/TextField';

export default function MemoAlarm() {

    const [startDate, setStartDate] = useState()

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="DateTime"
                inputFormat={"yyyy-MM-dd hh:mm"}
                value={startDate}
                onChange={(newValue) => {
                    setStartDate(newValue);
                }}
            />
        </LocalizationProvider>
    );
};


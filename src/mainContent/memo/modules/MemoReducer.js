import { createContext } from "react";
import update from 'react-addons-update'
import {sendMessage, sendMessageOut} from './useSocket';

// export const memoList = data;
export const memoList = [];
export const MemoContext = createContext(memoList);


export const memoReducer = (state, action) => {
  switch(action.type) {
    
    case 'GET_ALLHASHLIST':
      return action.memoList

    case 'GET_MEMOLIST':
      return action.memoListFromServer

    case 'ADD_MEMO':
      return [
        action.memo,
        ...state
      ]

    case 'EMPTY':
      return [
        ...state
      ]

    case 'DEL_MEMO':
      return  state.filter((currentValue, indx) =>  currentValue.no !== action.no)

    case 'MODIFY_MEMO':
      var newList = [];
      state.map( (value, index) =>  {
        if (value.no === action.no) { 
        newList.push({...value, [action.name] : action.value, ["handling"]: "1"}) 
        } else {
        newList.push(value) }
      }) 
      state = newList;
      return state

    case 'MODIFY_MEMO_SELF':
      sendMessage(action)
      var newList = [];
      state.map( (value, index) =>  {
        if (value.no === action.no) { 
        newList.push({...value, [action.name] : action.value}) 
        } else {
        newList.push(value) }
      }) 
      state = newList;
      return state

    case 'USER_LEAVE_MEMO':
      sendMessageOut(action);
      var newList = [];
      state.map( (value, index) =>  {
        if (value.no === action.no) { 
        newList.push({...value, [action.name] : action.value, ["handling"]: "0"}) 
        } else {
        newList.push(value) }
      }) 
      state = newList;
      return state

    case 'CHANGE_COLOR':
      return {
        ...state,
        color: action.color
      }

    case 'CHANGE_ALARM':
      return {
        ...state,
        alarm: {
          time: action.time,
          repetition: action.repetition
        }
      }

    case 'CHANGE_HASH':
      return {
        ...state,
        hash: action.hash
      }

    

    default:
      throw new Error();
  }
};                         

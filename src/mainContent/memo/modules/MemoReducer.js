import { createContext } from "react";
import data from "../../../assets/data/memoMessageData.json";  //  더미 데이터

// export const memoList = data;
export const memoList = [];
export const MemoContext = createContext(memoList);

export const memoReducer = (state, action) => {
  switch(action.type) {
    case 'GET_ALLHASH':
      return [
        action.hash
      ]

    case 'GET_MEMOLIST':

      return action.memoListFromServer

    case 'ADD_MEMO':
      return [
        ...state,
        action.memo
      ]

    case 'EMPTY':
      return [
        ...state
      ]

    case 'DEL_MEMO':
      return  state.filter((currentValue, indx) =>  indx !== action.id)

    case 'MODIFY_MEMO':
      return [
        ...state,
        action.memo,
      ]

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



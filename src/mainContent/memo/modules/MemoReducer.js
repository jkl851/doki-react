import { createContext } from "react";

export const MemoContext = createContext();

export const memoInitialState = {
  title: "",
  content: "",
  alarm: {
      time: new Date("yyyy-MM-dd hh:mm"),
      repetition: "0",
    },
  color: "#FFFFFF",
  hash: {}
}

export const memoReducer = (state, action) => {
  switch(action.type) {

    case 'MEMO_INPUT':
      return {
        ...state,
        [action.name]: action.value,
      }

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

    case 'INITIALIZE':
    return {
      ...memoInitialState,
    }

    default:
      return state;
  }
};                         



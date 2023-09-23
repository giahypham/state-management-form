// ❗ You don't need to add extra reducers to achieve MVP
import { combineReducers } from 'redux'
// import { MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE, SET_QUIZ_INTO_STATE, SET_SELECTED_ANSWER, SET_INFO_MESSAGE, INPUT_CHANGE, RESET_FORM  } from './action-types'
import * as types from './action-types'

const initialWheelState = 0
function wheel(state = initialWheelState, action) {
  switch(action.type) {
    case types.MOVE_CLOCKWISE:
      return (state + 1) % 6 ; //Modulo 6 to keep the value in the range 0-5 otherwise it would go out of the grid
    case types.MOVE_COUNTERCLOCKWISE:
      return (state - 1 + 6) % 6 ; //When moving counterclockwise from 0, we want the wheel index to be 5, so +6 will keep the values between 0-5
    default: 
      return state;
  }
}

const initialQuizState = null
function quiz(state = initialQuizState, action) {
  switch(action.type) { 
    case types.SET_QUIZ_INTO_STATE:
      return action.payload;
    default:
      return state;
  }
  
}

const initialSelectedAnswerState = null
function selectedAnswer(state = initialSelectedAnswerState, action) {
  switch(action.type) {
    case types.SET_SELECTED_ANSWER:
      return action.payload;
    default:
      return state;
  }
}

const initialMessageState = ''
function infoMessage(state = initialMessageState, action) {
  switch(action.type) {
    case types.SET_INFO_MESSAGE:
      return action.payload;
    default:
      return state;
  }
}

const initialFormState = {
  newQuestion: '',
  newTrueAnswer: '',
  newFalseAnswer: '',
}
function form(state = initialFormState, action) {
  return state
}

export default combineReducers({ wheel, quiz, selectedAnswer, infoMessage, form })

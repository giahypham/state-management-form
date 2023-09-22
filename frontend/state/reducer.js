// ❗ You don't need to add extra reducers to achieve MVP
import { combineReducers } from 'redux'
import { MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE, SET_QUIZ_INTO_STATE, SET_SELECTED_ANSWER, SET_INFO_MESSAGE, INPUT_CHANGE, RESET_FORM  } from './action-types'


const initialWheelState = 0
function wheel(state = initialWheelState, action) {
  switch(action.type) {
    case MOVE_CLOCKWISE:
      return (state + 1) % 6 ; //Modulo 6 to keep the value in the range 0-5 otherwise it would go out of the grid
    case MOVE_COUNTERCLOCKWISE:
      return (state - 1 + 5) % 6 ; //+5 to keep the value from going negative
    default: 
      return state;
  }
}

const initialQuizState = null
function quiz(state = initialQuizState, action) {
  return state
}

const initialSelectedAnswerState = null
function selectedAnswer(state = initialSelectedAnswerState, action) {
  return state
}

const initialMessageState = ''
function infoMessage(state = initialMessageState, action) {
  return state
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

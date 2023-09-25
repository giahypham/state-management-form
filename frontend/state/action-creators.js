// ❗ You don't need to add extra action creators to achieve MVP
import * as types from "./action-types"
// import { MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE, SET_QUIZ_INTO_STATE, SET_SELECTED_ANSWER, SET_INFO_MESSAGE, INPUT_CHANGE, RESET_FORM } from "./action-types"
import axios from "axios";



export function moveClockwise() {
  return {type: types.MOVE_CLOCKWISE};
 }

export function moveCounterClockwise() {
  return {type: types.MOVE_COUNTERCLOCKWISE};
 }

export function selectAnswer(answerId) {
  return {type: types.SET_SELECTED_ANSWER, payload: answerId};
 }
  
export function setMessage(message) {
  return {type: types.SET_INFO_MESSAGE, payload: message};
 }

export function setQuiz(quiz) {
  return {type: types.SET_QUIZ_INTO_STATE, payload: quiz};
 }

export function inputChange() {
  return {type: types.INPUT_CHANGE};
 }

export function resetForm() {
  return {type: types.RESET_FORM};
 }

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
    dispatch(setQuiz(null))//Reset quiz state to show "loading next quiz.."
    axios.get(`http://localhost:9000/api/quiz/next`)
    .then((resp) => {
      console.log(resp);
      dispatch(setQuiz(resp.data));
    })
    .catch((err) => {
      console.error(err);
    })
  }
}
export function postAnswer(quizId, answerId) {
  const payload = {
    quiz_id: quizId,
    answer_id: answerId
  }
  return function (dispatch) {
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
    axios.post(`http://localhost:9000/api/quiz/answer`, payload)
    .then((resp) => {
      dispatch(selectAnswer(null))
      dispatch(setMessage(resp.data.message))
      dispatch(fetchQuiz())
    })
    .catch((err) => {
      console.error(err);
    })
  }
}
export function postQuiz() {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
    axios.post(``)
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state

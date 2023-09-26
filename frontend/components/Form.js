import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

export function Form(props) {
  const { inputChange, postQuiz, form, resetForm } = props
  const onChange = evt => {
    const { id, value } = evt.target;
    inputChange(id, value);
  }

  const onSubmit = evt => {
    evt.preventDefault();

    //Creates a payload to pass input data to action creator postQuiz()
    const payload = {
      question_text: form.newQuestion,
      true_answer_text: form.newTrueAnswer,
      false_answer_text: form.newFalseAnswer
    }

    //Creates a payload to pass input data to action creator setMessage()
    const question = form.newQuestion;

    postQuiz(payload, question);
    
  }

  //Make sure that form has inputs
  const isFormValid = (
    form.newQuestion.trim().length > 0 &&
    form.newTrueAnswer.trim().length > 0 &&
    form.newFalseAnswer.trim().length > 0
  )

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} onChange={onChange} id="newQuestion" value={form.newQuestion} placeholder="Enter question" />
      <input maxLength={50} onChange={onChange} id="newTrueAnswer" value={form.newTrueAnswer} placeholder="Enter true answer" />
      <input maxLength={50} onChange={onChange} id="newFalseAnswer" value={form.newFalseAnswer} placeholder="Enter false answer" />
      <button 
        id="submitNewQuizBtn"
        disabled={!isFormValid}
      >
        Submit new quiz
      </button>
    </form>
  )
}

export default connect(st => st, actionCreators)(Form)

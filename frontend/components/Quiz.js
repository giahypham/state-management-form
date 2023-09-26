import React, { useEffect } from 'react'
import { connect } from 'react-redux';

import { fetchQuiz, selectAnswer, postAnswer } from '../state/action-creators';


function Quiz(props) {
  const { fetchQuiz, selectAnswer, postAnswer, selectedAnswer, quiz} = props;

  useEffect(() => {
    if (!quiz) {
      fetchQuiz();
  }}, [])

  const handleAnswerClick = (answerId) => {
   selectAnswer(answerId);
  }
  
  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        quiz ? (
          <>
            <h2>{quiz.question}</h2>
          
            <div id="quizAnswers">
              {quiz.answers.map((answer) => (
                <div 
                  key={answer.answer_id}
                  className={`answer ${selectedAnswer === answer.answer_id ? 'selected' : ''}`}
                  //if the answer currently selected is the same as answer_id, clear the selection, if not set selected answer into state
                  onClick={() => handleAnswerClick(answer.answer_id)}
                >
                {answer.text}
                {selectedAnswer === answer.answer_id ? (
                  <button>SELECTED</button>
                ) : (
                  <button>Select</button>
                )
                }
                </div>
              ))}
            </div>

            <button 
              id="submitAnswerBtn" 
              disabled={!selectedAnswer}
              onClick={() => {
                if (selectedAnswer) {
                postAnswer(quiz.quiz_id, selectedAnswer)
                }
              }}
            >
              Submit answer
            </button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    quiz: state.quiz,
    selectedAnswer: state.selectedAnswer,
  }
}

export default connect(mapStateToProps, { selectAnswer, postAnswer, fetchQuiz })(Quiz);
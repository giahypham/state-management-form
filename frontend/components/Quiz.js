import React, { useEffect } from 'react'
import { connect } from 'react-redux';

import { fetchQuiz, selectAnswer, postAnswer} from '../state/action-creators';

function Quiz(props) {
  const { selectAnswer, selectedAnswer, quiz, infoMessage, fetchQuiz } = props;

  useEffect(() => {
    fetchQuiz();
  }, [])

  const handleAnswerClick = (answerId) => {
    if (selectedAnswer === answerId) {
      selectAnswer(answerId);
    } else {
      selectAnswer(null);
    }
  }

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        quiz ? (
          <>
            <h2>{quiz.question}</h2>

            <div id="quizAnswers">
              {/* <div className="answer selected">
                A function
                <button>
                  SELECTED
                </button>
              </div>

              <div className="answer">
                An elephant
                <button>
                  Select
                </button>
              </div> */}
              {quiz.answers.map((answer) => (
                <div 
                  key={answer.answer_id}
                  className={`answer ${selectedAnswer === answer.answer_id ? 'selected' : ''}`}
                  onClick={() => {handleAnswerClick}}
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

            <button id="submitAnswerBtn">Submit answer</button>
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
    infoMessage: state.infoMessage
  }
}

export default connect(mapStateToProps, { selectAnswer, postAnswer, fetchQuiz })(Quiz);
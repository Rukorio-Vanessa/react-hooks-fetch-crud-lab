import React from "react";

function QuestionItem({ question, onDeleteClick, onAnswerChange }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  const deleteOnClickHandler = function() {
    onDeleteClick(id)
  }

  const changeOnAnswerHandler= function(e) {
    onAnswerChange(id, parseInt(e.target.value))
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={changeOnAnswerHandler}>
          {options}
        </select>
      </label>
      <button onClick={deleteOnClickHandler}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;

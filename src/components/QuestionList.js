import React, {useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((questions) => {
        setQuestions(questions);
      });
  }, []);


  const deleteOnClickHandler =function(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => {
        const updatedQuestions = questions.filter((quest) => quest.id !== id);
        setQuestions(updatedQuestions);
      });
  }

  const changeOnAnswerHandler = function(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then((r) => r.json())
      .then((updatedQuestion) => {
        const updatedQuestions = questions.map((quest) => {
          if (quest.id === updatedQuestion.id) return updatedQuestion;
          return quest;
        });
        setQuestions(updatedQuestions);
      });
  }
  
  const questionItems = questions.map((quest) => (
    <QuestionItem
      key={quest.id}
      question={quest}
      onDeleteClick={deleteOnClickHandler}
      onAnswerChange={changeOnAnswerHandler}
    />
  ))

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {/* display QuestionItem components here after fetching */}
        {questionItems}
      </ul>
    </section>
  );
}

export default QuestionList;

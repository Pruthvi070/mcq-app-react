/* eslint-disable no-const-assign */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, useRef } from "react";
import "./Quiz.css";
import { reactData } from "../../assets/data";

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(reactData[index]);
  const [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);

  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);

  let option_array = [Option1, Option2, Option3, Option4];

  const checkAns = (e, ans) => {
    if (!lock) {
      if (question.ans === ans) {
        e.target.classList.add("correct");
        setScore((prevScore) => prevScore + 1);
      } else {
        e.target.classList.add("wrong");
      }
      setLock(true);
      option_array[question.ans - 1].current.classList.add("correct");
    }
  };

  const next = () => {
    if (lock) {
      if (index === reactData.length - 1) {
        setResult(true);
        return;
      }
      setIndex((prevIndex) => {
        const newIndex = prevIndex + 1;

        if (newIndex < reactData.length) {
          setQuestion(reactData[newIndex]);
          return newIndex;
        } else {
          return prevIndex;
        }
      });

      setLock(false);

      option_array.forEach((option) => {
        if (option.current) {
          option.current.classList.remove("correct");
          option.current.classList.remove("wrong");
        }
      });
    }
  };

  const resetQuiz = () => {
    setIndex(0);
    setScore(0);
    setLock(false);
    setResult(false);
    setQuestion(reactData[0]);
  };

  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />
      {result ? (
        <>
          <h2>
            You Scored {score} out of {reactData.length}
          </h2>
          <button onClick={resetQuiz}>Reset</button>
        </>
      ) : (
        <>
          <h2>
            {index + 1}. {question.question}
          </h2>
          <ul>
            <li ref={Option1} onClick={(e) => checkAns(e, 1)}>
              {question.option1}
            </li>
            <li ref={Option2} onClick={(e) => checkAns(e, 2)}>
              {question.option2}
            </li>
            <li ref={Option3} onClick={(e) => checkAns(e, 3)}>
              {question.option3}
            </li>
            <li ref={Option4} onClick={(e) => checkAns(e, 4)}>
              {question.option4}
            </li>
          </ul>
          <button onClick={next} disabled={!lock}>
            Next
          </button>
          <div className="index">
            {index + 1} of {reactData.length} questions
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;

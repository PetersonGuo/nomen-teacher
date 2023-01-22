import React from 'react';
import Prompt from "./Prompt";
import Modal from './Modal';
import questions from './questions.json';
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/24/outline";

export default function Quiz() {
  const [correct, setCorrect] = React.useState(0);
  const [queue, setQueue] = React.useState([]);
  const [index, setIndex] = React.useState(-1);
  const [open, setOpen] = React.useState(false);
  const [question, setQuestion] = React.useState(getQuestion);

  function setClicked(id) {
    setQuestion(prevQuestion => {
      if (prevQuestion.answers.find(e => e.id === id).isRight) setCorrect(correct+1);
      let newAnswers = prevQuestion.answers.map(ans => {
        return ans.id === id ? {...ans, isClicked: true} : ans;
      })
      return {
        ...prevQuestion,
        answers: newAnswers,
        answered: true
      };
    });
  }

  function used(q) {
    for (let i in queue) {
      if (i.id === q.id) return true;
    }
    return false;
  }

  function getQuestion() {
    setIndex(index + 1);
    if (index === queue.length-1) {
      const qs = questions.questions;
      let q = qs[qs.length * Math.random() << 0];
      while (used(q)) {
        q = qs[qs.length * Math.random() << 0];
      }
      q.answered = false;
      let currentIndex = q.answers.length, randomIndex;
      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [q.answers[currentIndex], q.answers[randomIndex]] = [q.answers[randomIndex], q.answers[currentIndex]];
      }
      let newQueue = queue;
      newQueue.push(q);
      setQueue(newQueue);
      return q;
    } else {
      return queue[index];
    }
  }

  function previous() {
    setIndex(index - 1);
    setQuestion(queue[index]);
  }

  return (
      <>
        <button className={"mx-auto hover:color-white hover:bg-blue-500 my-5 py-1 px-2 border-blue-500 rounded-lg" +
            " border-2 w-60 h-10 cursor-pointer"} onClick={() => setOpen(true)}>Settings
        </button>
        <p>Question: {index+1} / {queue.length}</p>
        <p>Correct: {correct} / {queue.length}</p>
        <Prompt question={question} setClicked={setClicked} />
        <div className={"fixed left-[50%] bottom-[20%]"}>
          <div className={"grid grid-cols-2 relative left-[-50%] gap-x-32"}>
            {index === 0 ? <div /> : <ChevronLeftIcon
                className={`mx-auto my-5 border-2 py-1 px-2 rounded-lg w-60 h-10 cursor-pointer hover:bg-blue-500 border-blue-500`}
                onClick={() => previous()}/>}
            {question.answered ? <ChevronRightIcon
                className={"mx-auto hover:bg-blue-500 my-5 py-1 px-2 border-blue-500 rounded-lg" +
                    " border-2 w-60 h-10 cursor-pointer"} onClick={() => setQuestion(getQuestion())}/> : <div />}
          </div>
        </div>
        <Modal setOpen={setOpen} open={open}/>
      </>
  );
}

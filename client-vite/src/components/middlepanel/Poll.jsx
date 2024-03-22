import React, { useEffect, useState } from "react";
import ProgressBar from "../progressbar/ProgressBar";
import CheckBar from "../checkbar/CheckBar";

const Poll = ({ chat }) => {
  const [answers, setAnswers] = useState({});
  const [people, setPeople] = useState(0);
  useEffect(() => {
    const temp = {};
    let p = 0;
    for (const ans of chat.answers) {
      const { answer, selectedUsers } = ans;
      p = p < selectedUsers.length ? selectedUsers.length : p;
      temp[answer] = false;
    }
    setPeople(p);
    setAnswers(temp);
  }, [chat]);
  console.log(chat.question, people);
  return (
    <div className="flex flex-col w-[20vw]">
      <div className="font-medium">{chat.question}</div>
      <div className="text-xs">
        {chat.type === "single" ? "Select one" : "Select one or more"}
      </div>
      <div className="flex flex-col gap-2">
        {chat.answers.map((answer) => (
          <div className="flex w-full h-full items-center gap-2">
            <CheckBar
              answer={answer.answer}
              answers={answers}
              setAnswers={setAnswers}
              selectedUsers={answer.selectedUsers}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Poll;

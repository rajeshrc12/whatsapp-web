import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";

const PollAnswer = ({ ans, chatId, currentUser, selectedUser }) => {
  const [ansCheckbox, setAnsCheckbox] = useState(false);
  useEffect(() => {
    if (ans.users.includes(currentUser)) setAnsCheckbox(true);
    else setAnsCheckbox(false);
  }, [ans]);
  return (
    <div className="flex gap-3 justify-between px-3">
      <div>
        <input
          type="checkbox"
          checked={ansCheckbox}
          onChange={(e) => {
            const query = {
              chatId,
              answer: ans.answer,
              currentUser,
              selectedUser,
            };
            if (e.target.checked) {
              query.action = "add";
            } else {
              query.action = "remove";
            }
            axios.post("http://localhost:3001/vote", query);
            setAnsCheckbox(e.target.checked);
          }}
          className="rounded-lg"
        />
      </div>
      <div className="w-full">
        <div className="flex justify-between">
          <div>{ans.answer}</div>
          <div>{ans.users.length}</div>
        </div>
        <progress
          className="progress"
          value={ansCheckbox ? 100 : 0}
          max="100"
        ></progress>
      </div>
    </div>
  );
};

export default PollAnswer;

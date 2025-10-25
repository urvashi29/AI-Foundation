import React, { useState } from "react";
import axios, { all } from "axios";

const App = () => {
  const [task, setTask] = useState("");
  const [aiData, setAiData] = useState([]);
  const [allTasks, setAllTasks] = useState([]);

  const handleAssist = async () => {
    setAllTasks([{ ...allTasks, task }]);
    try {
      const data = await axios.post(
        "http://localhost:5678/webhook/assistTask",
        task
      );
      console.log(data);
      setAiData(data);
      setTask("");
    } catch (err) {
      console.log(err);
    }
  };

  const prioritizeTask = async () => {
    console.log(allTasks);
    try {
      const dataP = await axios.post(
        "http://localhost:5678/webhook/prioritizeTasks",
        allTasks
      );
      console.log(dataP);
      setAiData(dataP.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>AI Powered To-Do</h1>
      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter Task..."
      />
      <button onClick={handleAssist}>AI Assist</button>

      {allTasks.length ? (
        <button onClick={prioritizeTask}>Prioritize</button>
      ) : (
        <p>No Task Yet!</p>
      )}
      {aiData.length && (
        <div>
          <h2>AI Suggestions</h2>
          <p>{aiData.priority}</p>
        </div>
      )}
    </div>
  );
};

export default App;

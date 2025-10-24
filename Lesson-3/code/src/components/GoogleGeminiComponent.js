import React, { useState } from "react";
import { getGeminiResponse } from "./geminiService";

const GoogleGeminiComponent = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    //api call
    const aiResponse = await getGeminiResponse(input);
    setResponse(aiResponse);
  };

  return (
    <div>
      <h2>Intergrating Gemini API with ReactJs.</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your prompt here!... "
        />

        <br />
        <button type="submit">Generate</button>
      </form>

      {response.length ? <p>{response}</p> : <p>Add Prompt...</p>}
    </div>
  );
};

export default GoogleGeminiComponent;

// import { useState } from "react";
import "./App.css";
import IOShortener from "./components/IOShortener.js";

function App() {
  // const [inputValue, setInputValue] = useState("");

  return (
    <div className="container">
      <div>
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
      </div>
      <IOShortener />
    </div>
  );
}

export default App;

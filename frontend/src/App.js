import logo from "./logo.svg";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [error, setError] = useState(null);
  const [data, setData] = useState({});

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/test-data")
      .then((res) => res.json())
      .then(
        (result) => {
          setData(result);
        },
        (error) => {
          setError(error);
        },
      );
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <span>
          Django backend data: <b>{data.data}</b>
        </span>

        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

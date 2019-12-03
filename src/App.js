import React, { useState } from "react";
import CSVReader from "react-csv-reader";
import "./App.css";

import Button from "./components/Button";
import { PARSER_OPTIONS } from "./constants";

function App() {
  const [selectedFile, setSelectedFile] = useState([]);
  const [jsonToImport, setJsonToImport] = useState("");

  const fileChange = data => {
    setSelectedFile(data);
  };

  const parseData = (acummulator, { user, clientKey, id, name }) => ({
    ...acummulator,
    [user]: {
      ...acummulator[user],
      [clientKey]: {
        id,
        name
      }
    }
  });

  const processFile = () => {
    if (selectedFile.length) {
      setJsonToImport("Proccesing...");
      const parsedFile = selectedFile.reduce(parseData, {});
      setJsonToImport(JSON.stringify(parsedFile, null, 2));
    } else {
      setJsonToImport("File requiered!");
    }
  };

  const clearAction = () => {
    setJsonToImport("");
  };

  return (
    <div className="App">
      <h1>Convert to JSON from CSV</h1>
      <p>File must have columns: [user, clientKey, id, name]</p>
      <CSVReader
        cssClass="Uploader-container"
        onFileLoaded={fileChange}
        parserOptions={PARSER_OPTIONS}
        inputStyle={{ color: "green" }}
      />
      <Button
        className="Button Primary-button"
        text="Process"
        onClickHandler={processFile}
      />
      <div className="Text-container">
        <textarea
          name="jsonToImport"
          readOnly
          cols="80"
          rows="40"
          value={jsonToImport}
        ></textarea>
      </div>
      <p>Command + A, Command + C to copy</p>
      <Button
        className="Button Secundary-button"
        text="Clear"
        onClickHandler={clearAction}
      />
    </div>
  );
}

export default App;

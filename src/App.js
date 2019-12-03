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

  const parseData = (
    acummulator,
    { user, clientKey, clientId, clientName }
  ) => {
    return {
      ...acummulator,
      [user]: {
        [clientKey]: {
          clientId,
          clientName
        }
      }
    };
  };

  const processFile = () => {
    if (selectedFile.length) {
      setJsonToImport("Proccesing...");
      const parsedFile = selectedFile.reduce(parseData, {});
      setJsonToImport(JSON.stringify(parsedFile, null, 2));
    } else {
      setJsonToImport("File requiered!");
    }
  };

  return (
    <div className="App">
      <h1>Convert to JSON from CSV</h1>
      <p>File must have columns: [user, clientKey, clientId, clientName]</p>
      <CSVReader
        cssClass="Uploader-container"
        onFileLoaded={fileChange}
        parserOptions={PARSER_OPTIONS}
      />
      <Button className="Button" text="Process" onClickHandler={processFile} />
      <div>
        <textarea
          name="jsonToImport"
          readOnly
          cols="80"
          rows="40"
          value={jsonToImport}
        ></textarea>
      </div>
      <p>Command + A, Command + C to copy</p>
    </div>
  );
}

export default App;

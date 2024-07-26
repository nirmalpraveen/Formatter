import React, { useState } from "react";
import "./App.css";
import { format as formatXML } from "xml-formatter";
import xmlParser from 'fast-xml-parser';
import Editor from '@monaco-editor/react';

const App = () => {
  const [inputText, setInputText] = useState("");
  const [formattedText, setFormattedText] = useState("");
  const [formatType, setFormatType] = useState("json");

  const handleConvert = () => {
    try {
      if (formatType === 'json') {
        const json = JSON.parse(inputText);
        setFormattedText(JSON.stringify(json, null, 2));
      } else if (formatType === 'xml') {
        if (xmlParser.validate(inputText) === true) {
          const formattedXml = formatXML(inputText);
          setFormattedText(formattedXml);
        } else {
          setFormattedText('Invalid XML');
        }
      }
    } catch (error) {
      setFormattedText(`Invalid ${formatType.toUpperCase()}`);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedText);
    alert(`${formatType.toUpperCase()} copied to clipboard!`);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Formatter</h1>
      </header>
      <div className="formatter">
        <textarea
          className="input"
          placeholder={`Paste unformatted ${formatType.toUpperCase()} here`}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <div className="centerArea">
        {/* <select
          className="format-select"
          value={formatType}
          onChange={(e) => setFormatType(e.target.value)}
        >
          <option value="json">JSON</option>
          <option value="xml">XML</option>
        </select> */}
        <button className="convert-button" onClick={handleConvert}>
          Convert
        </button>
        </div>
        <textarea
          className="output"
          placeholder={`Formatted ${formatType.toUpperCase()} will appear here`}
          value={formattedText}
          readOnly
        />
        <button className="copy-button" onClick={handleCopy}>
          Copy Formatted {formatType.toUpperCase()}
        </button>
      </div>
    </div>
  );
};

export default App;

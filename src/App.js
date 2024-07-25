import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [unformattedJson, setUnformattedJson] = useState('');
  const [formattedJson, setFormattedJson] = useState('');

  const handleConvert = () => {
    try {
      const json = JSON.parse(unformattedJson);
      setFormattedJson(JSON.stringify(json, null, 2));
    } catch (error) {
      setFormattedJson('Invalid JSON');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedJson);
    alert('Formatted JSON copied to clipboard!');
  };

  return (
    <div className="app">
      <h1>Formatter</h1>
      <div className="formatter">
        <textarea
          className="input"
          placeholder="Paste unformatted JSON here"
          value={unformattedJson}
          onChange={(e) => setUnformattedJson(e.target.value)}
        />
        <button className="convert-button" onClick={handleConvert}>
          Convert
        </button>
        <textarea
          className="output"
          placeholder="Formatted JSON will appear here"
          value={formattedJson}
          readOnly
        />
      </div>
      <button className="copy-button" onClick={handleCopy}>
        Copy Formatted JSON
      </button>
    </div>
  );
};

export default App;

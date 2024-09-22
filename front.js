import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './App.css';

// Define options for the multiselect dropdown
const options = [
  { value: 'alphabets', label: 'Alphabets' },
  { value: 'numbers', label: 'Numbers' },
  { value: 'highest_lowercase_alphabet', label: 'Highest Lowercase Alphabet' }
];

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle JSON input changes
  const handleJsonInputChange = (event) => {
    setJsonInput(event.target.value);
  };

  // Handle JSON validation and submission
  const handleSubmit = async () => {
    try {
      // Validate JSON input
      const parsedJson = JSON.parse(jsonInput);
      
      // Send POST request to the backend
      const response = await axios.post('http://127.0.0.1:8000/docs#//bfhl', parsedJson);
      
      // Save response data
      setResponseData(response.data);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Invalid JSON or API Error!');
      setResponseData(null);
    }
  };

  // Filter response data based on selected options
  const filterResponseData = () => {
    if (!responseData) return null;
    
    const filteredData = {};
    selectedOptions.forEach(option => {
      filteredData[option.value] = responseData[option.value];
    });
    return filteredData;
  };

  return (
    <div className="App">
      <h1>React App - BFHL Challenge</h1>

      {/* JSON Input Field */}
      <textarea
        rows="6"
        cols="50"
        placeholder='Enter JSON: { "data": ["A", "C", "z"] }'
        value={jsonInput}
        onChange={handleJsonInputChange}
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>

      {/* Error Message */}
      {errorMessage && <p className="error">{errorMessage}</p>}

      {/* Dropdown for selecting response fields */}
      {responseData && (
        <Select
          isMulti
          options={options}
          onChange={setSelectedOptions}
          placeholder="Select fields to display..."
        />
      )}

      {/* Display filtered response data */}
      <div className="response">
        {responseData && selectedOptions.length > 0 && (
          <pre>{JSON.stringify(filterResponseData(), null, 2)}</pre>
        )}
      </div>
    </div>
  );
}

export default App;

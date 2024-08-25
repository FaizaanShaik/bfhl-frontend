import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [jsonInput, setJsonInput] = useState('');
    const [response, setResponse] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        setJsonInput(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            const parsedInput = JSON.parse(jsonInput);
            const { data } = await axios.post('https://your-backend-url.herokuapp.com/bfhl', parsedInput);
            setResponse(data);
            setError('');
        } catch (err) {
            setError('Invalid JSON or error in API request.');
            setResponse(null);
        }
    };

    const handleDropdownChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setSelectedOptions([...selectedOptions, value]);
        } else {
            setSelectedOptions(selectedOptions.filter(option => option !== value));
        }
    };

    const renderResponse = () => {
        if (!response) return null;

        return (
            <div>
                {selectedOptions.includes('Numbers') && <div>Numbers: {response.numbers.join(', ')}</div>}
                {selectedOptions.includes('Alphabets') && <div>Alphabets: {response.alphabets.join(', ')}</div>}
                {selectedOptions.includes('Highest lowercase alphabet') && <div>Highest lowercase alphabet: {response.highest_lowercase_alphabet.join(', ')}</div>}
            </div>
        );
    };

    return (
        <div>
            <h1>Your Roll Number</h1>
            <textarea value={jsonInput} onChange={handleInputChange} rows="10" cols="30" />
            <button onClick={handleSubmit}>Submit</button>
            {error && <p>{error}</p>}
            {response && (
                <div>
                    <label>
                        <input type="checkbox" value="Numbers" onChange={handleDropdownChange} />
                        Numbers
                    </label>
                    <label>
                        <input type="checkbox" value="Alphabets" onChange={handleDropdownChange} />
                        Alphabets
                    </label>
                    <label>
                        <input type="checkbox" value="Highest lowercase alphabet" onChange={handleDropdownChange} />
                        Highest lowercase alphabet
                    </label>
                    {renderResponse()}
                </div>
            )}
        </div>
    );
}

export default App;

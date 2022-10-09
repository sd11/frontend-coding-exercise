import React, { useEffect, useState } from "react";
import { debounce } from "lodash";
import { ResultsList } from "./components/ResultsList/ResultsList";
import { Input } from "./components/Input/Input";
import { Button } from "./components/Button/Button";
import { Alert } from "./components/Alert/Alert";
import "./App.css";

const API_URL = "http://localhost:8010/proxy/suburbs.json?q=";

const API_SAMPLE = [
  { name: "Sydney South", state: { abbreviation: "NSW" } },
  { name: "Sydney", state: { abbreviation: "NSW" } },
  { name: "Sydney International Airport", state: { abbreviation: "NSW" } },
  { name: "Sydney Domestic Airport", state: { abbreviation: "NSW" } },
  { name: "Sydenham", state: { abbreviation: "VIC" } }
];

const fetchSuburbs = async (queryParam, setSuburbs, setSelection) => {
  // If empty string don't call api
  if (!queryParam) {
    setSuburbs([]);
    return;
  }
  
  const response = await fetch(`${API_URL}${queryParam}`);
  let results = await response.json();

  results = results.filter(item => {
    const name = item.name.toLowerCase();
    return name.startsWith(queryParam.toLowerCase());
  });
  
  setSuburbs(results);
  setSelection('');
};

const debouncedFetch = debounce(fetchSuburbs, 600);

export default function App() {
  const [searchText, setSearchText] = useState('');
  const [suburbs, setSuburbs] = useState([]);
  const [selectedSuburb, setSelection] = useState('');
  const [message, setMessage] = useState('');

  async function onChange(value) {
    setSearchText(value);
    setMessage('');

    const search = debouncedFetch;
    search(value, setSuburbs, setSelection, setMessage);
  }

  function handleClick() {
    if (selectedSuburb) {
      setMessage(`Most recent suburb selection: ${selectedSuburb}`);
    }
  }

  function onSelect(value) {
    if (!value) {
      return; 
    }
    const displayName = `${value.name}, ${value.state.abbreviation}`
    setSearchText(displayName);
    setSelection(displayName);
    setSuburbs([]);
  }

  function handleAlert() {
    setMessage('');
  }

  return (
    <>
      <div className="container">
        <span className="suburb">Suburb</span>
        <div className="autoComplete">
          <div className="searchBox">
            <Input value={searchText} placeholder='Search suburbs' onChange={onChange} />
            <Button onClick={handleClick} aria-label="Search Suburbs" />
          </div>
          { suburbs && suburbs.length > 0 && <ResultsList items={suburbs} onSelect={onSelect} /> }
        </div>
      </div>
      { message && <Alert message={message} handleClick={handleAlert} /> }
    </>
  );
}

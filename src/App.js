import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { debounce } from "lodash";
import { ResultsList } from "./components/ResultsList/ResultsList";
import { Input } from "./components/Input/Input";
import { Button } from "./components/Button/Button";
import { Alert } from "./components/Alert/Alert";

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
      <Container>
        <Suburb>Suburb</Suburb>
        <AutoComplete>
          <SearchBox>
            <Input value={searchText} placeholder='Search suburbs' onChange={onChange} />
            <Button onClick={handleClick} aria-label="Search Suburbs" />
          </SearchBox>
          { suburbs && suburbs.length > 0 && <ResultsList items={suburbs} onSelect={onSelect} /> }
        </AutoComplete>
      </Container>
      { message && <Alert message={message} handleClick={handleAlert} /> }
    </>
  );
}

const Container = styled.div`
  display: inline-flex;
  align-items: center;
  justify-items: center;
  width: 100%;
`;

const Suburb = styled.span`
  font-size: 16px;
  font-weight: 600;
  margin-right: 16px;
`;

const AutoComplete = styled.div`
  width: 100%;
  max-width: 600px;
  position: relative;

  @media (min-width: 600px) {
    .autoComplete {
        width: 600px;
    }
  }
`;

const SearchBox = styled.div`
  width: 100%;
  display: inline-flex;
`;
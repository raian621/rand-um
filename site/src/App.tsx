import { useState } from 'react'
import './App.css'
import RangeBuilder from './RangeBuilder';
import ListBuilder from './ListBuilder';
import GeneratedURL from './GeneratedURL';

function App() {
  const [randomQueryType, setRandomQueryType] = useState("range")
  const [uniqueString, setUniqueString] = useState(generateUniqueString())
  const [query, setQuery] = useState("range=0,10")

  return (
    <>
      <h1>Generate a query URL</h1>
      <p>Since most social preview implementations cache social previews for 
      each URL, in order to ensure a unique query we have to provide a unique URL
      every time we want to create a new social preview.</p>
      <GeneratedURL uniqueString={uniqueString} query={query}/>
      <select onChange={e => setRandomQueryType(e.target.value)}>
        <option value="range">Range</option>
        <option value="list">List</option>
      </select>
      { randomQueryType === "range" && <RangeBuilder setQuery={setQuery}/> }
      { randomQueryType === "list" && <ListBuilder setQuery={setQuery}/> }
    </>
  )
}

function generateUniqueString() : string {
  // base64 encode a unix timestamp with some random bits appended to the end of
  // it and presto: you have yourself a (questionably) universally unique string
  const timestamp = Date.now()

  console.log(timestamp)

  const rawData = new Array<string>(9)
  
  rawData[0] = String.fromCharCode((timestamp >> 24) & 0xff)
  rawData[1] = String.fromCharCode((timestamp >> 16) & 0xff)
  rawData[2] = String.fromCharCode((timestamp >> 8) & 0xff)
  rawData[3] = String.fromCharCode(timestamp & 0xff)

  for (let i = 4; i < rawData.length; i++) {
    rawData[i] = String.fromCharCode(Math.floor(Math.random() * 256))
  }

  rawData.forEach(value => console.log(value.charCodeAt(0)))

  const rawString = rawData.join('')
  console.log(rawString)

  return btoa(rawString)
}

export default App

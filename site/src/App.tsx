import { useState } from 'react'
import './App.css'
import RangeBuilder from './RangeBuilder';
import ListBuilder from './ListBuilder';
import GeneratedURL from './GeneratedURL';
import QueryTypeSelector from './QueryTypeSelector';
import ImagesBuilder from './ImagesBuilder';

function App() {
  const [randomQueryType, setRandomQueryType] = useState("range")
  const [uniqueString, setUniqueString] = useState(generateUniqueString(Date.now()))
  const [query, setQuery] = useState("range=0,10")

  return (
    <>
      <h1>
        Random
        <QueryTypeSelector setQueryType={setRandomQueryType}/>
        Query URL Generator</h1>
      <p>Since most social preview implementations cache social previews for 
      each URL, in order to ensure a unique query we have to provide a unique URL
      every time we want to create a new social preview.</p>
      <GeneratedURL
        uniqueString={uniqueString}
        refreshUniqueString={() => { setUniqueString(generateUniqueString(Date.now())) }}
        query={query}
      />
      { randomQueryType === "range" && <RangeBuilder setQuery={setQuery}/> }
      { randomQueryType === "list" && <ListBuilder setQuery={setQuery}/> }
      { randomQueryType === "images" && <ImagesBuilder setQuery={setQuery}/> }
    </>
  )
}

function generateUniqueString(timestamp: number) : string {
  // base64 encode a unix timestamp with some random bits appended to the end of
  // it and presto: you have yourself a (questionably) universally unique string
  const rawData = new Array<string>(9)
  
  rawData[0] = String.fromCharCode((timestamp >> 24) & 0xff)
  rawData[1] = String.fromCharCode((timestamp >> 16) & 0xff)
  rawData[2] = String.fromCharCode((timestamp >> 8) & 0xff)
  rawData[3] = String.fromCharCode(timestamp & 0xff)

  for (let i = 4; i < rawData.length; i++) {
    rawData[i] = String.fromCharCode(Math.floor(Math.random() * 256))
  }

  const rawString = rawData.join('')
  const base64string = btoa(rawString).replace(/\//g, '-')

  return base64string
}

export default App

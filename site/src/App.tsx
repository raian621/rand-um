import { useState } from 'react'
import 'styles/App.css'
import RangeBuilder from './RangeBuilder';
import ListBuilder from './ListBuilder';
import QueryTypeSelector from './QueryTypeSelector';
import ImagesBuilder from './ImagesBuilder';
import GeneratedURL from 'components/GeneratedURL';
import generateUniqueString from 'util/uniqueString';

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

export default App

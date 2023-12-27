import { useState } from 'react'
import 'styles/App.css'
import RangeBuilder from './RangeBuilder';
import ListBuilder from './ListBuilder';
import QueryTypeSelector from './QueryTypeSelector';
import ImagesBuilder from './ImagesBuilder';
import GeneratedURL from 'components/GeneratedURL';
import generateUniqueString from 'util/uniqueString';
import { Header } from './components/Header';

function App() {
  const [randomQueryType, setRandomQueryType] = useState("images")
  const [uniqueString, setUniqueString] = useState(generateUniqueString(Date.now()))
  const [query, setQuery] = useState("range=0,10")

  return (
    <>
      <Header/>
      <h2>
        Generate a link for a random
        <QueryTypeSelector setQueryType={setRandomQueryType}/>:
      </h2>
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

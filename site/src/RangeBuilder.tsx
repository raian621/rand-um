import { useEffect, useState } from "react";

function RangeBuilder({setQuery} : {
  setQuery: React.Dispatch<React.SetStateAction<string>>
}) {
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(10);

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldValue = parseInt(e.target.value);

    // workaround for weird state behavior: after we call setFoo, the variable
    // foo keeps the value of the previous state instead of being reassigned to
    // the new state. I'm sure there's a more elegant solution, but for now this
    // works
    let [localStart, localEnd] = [start, end]

    if (e.target.name === "start") {
      setStart(fieldValue)
      localStart = fieldValue
    } else {
      setEnd(fieldValue)
      localEnd = fieldValue
    }

    setQuery(`range=${localStart},${localEnd}`)
  }
  useEffect(() => setQuery(`range=${start},${end}`), [])
  

  return (
    <>
      <label htmlFor="start">Start</label>
      <input 
        type="number"
        name="start"
        value={`${start}`}
        onChange={handleFieldChange}
      />
      <label htmlFor="end">End</label>
      <input 
        type="number"
        name="end"
        value={`${end}`}
        onChange={handleFieldChange}
      />
    </>
  )
}

export default RangeBuilder
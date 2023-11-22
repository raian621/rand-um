import { useEffect, useState } from "react";

function RangeBuilder({setQuery} : {
  setQuery: React.Dispatch<React.SetStateAction<string>>
}) {
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(10);

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldValue = parseInt(e.target.value);

    if (e.target.name === "start") {
      setStart(fieldValue)
    } else {
      setEnd(fieldValue)
    }

  }
  useEffect(() => setQuery(`range=${start},${end}`), [start, end, setQuery])

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
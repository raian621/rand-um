import { useEffect, useState } from "react";

import 'styles/RangeBuilder.css'

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
    <div className="range-builder">
      <div className="range-input">
        <label htmlFor="start">Start</label>
        <input 
          type="number"
          name="start"
          value={`${start}`}
          onChange={handleFieldChange}
        />
      </div>
      <div className="range-input">
        <label htmlFor="end">End</label>
        <input 
          type="number"
          name="end"
          value={`${end}`}
          onChange={handleFieldChange}
        />
      </div>
    </div>
  )
}

export default RangeBuilder
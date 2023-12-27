import 'styles/QueryTypeSelector.css'

export default function QueryTypeSelector({ setQueryType } : {
  setQueryType: React.Dispatch<React.SetStateAction<string>>
}) {
  return (
    <select className="query-type-selector" onChange={e => setQueryType(e.target.value)}>
      <option value="images">image</option>
      <option value="range">range</option>
      <option value="list">list</option>
    </select>
  )
}
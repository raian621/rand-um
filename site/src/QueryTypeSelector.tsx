import 'styles/QueryTypeSelector.css'

export default function QueryTypeSelector({ setQueryType } : {
  setQueryType: React.Dispatch<React.SetStateAction<string>>
}) {
  return (
    <select className="query-type-selector" onChange={e => setQueryType(e.target.value)}>
      <option value="range">Range</option>
      <option value="list">List</option>
      <option value="images">Images</option>
    </select>
  )
}
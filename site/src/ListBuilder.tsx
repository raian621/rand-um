import { useEffect } from "react"

import 'styles/ListBuilder.css'
import { useList } from "./hooks/useList"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

function queryString(list: string[]): string {
  let qstring = "list="
  list.forEach((value) => {
    if (value !== "")
      qstring += `${value},` 
  })
  return qstring.slice(0, qstring.length - 1)
}

function ListBuilder({ setQuery }:{
  setQuery: React.Dispatch<React.SetStateAction<string>>
}) {
  const [list, listItemComponents, addListItem] = useList(["apple", "orange", "banana"])

  useEffect(() => setQuery(queryString(list)), [list, setQuery])

  return (
    <div className="listbuilder">
      <h2>List builder:</h2>
      { listItemComponents }
      <button onClick={() => addListItem()}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  )
}

export default ListBuilder
import { useEffect, useState } from "react"

import './ListBuilder.css'

function queryString(list: string[]): string {
  let qstring = "list="
  console.log(list)
  list.forEach((value) => {
    console.log(value)
    if (value !== "")
      qstring += `${value},` 
  })
  console.log(qstring)
  return qstring.slice(0, qstring.length - 1)
}

function ListBuilder({ setQuery }:{
  setQuery: React.Dispatch<React.SetStateAction<string>>
}) {
  const [ list, setList ] = useState(["apple", "orange", "banana"])
  useEffect(() => setQuery(queryString(list)), [list])

  const updateListItem = (index: number, value: string) => {
    const newList = [...list]
    console.log(value)
    newList[index] = value
    setList(newList)
  }

  const deleteListItem = (index: number) => {
    let newList: string[]

    if (list.length === 1) {
      newList = []
    } else if (index === list.length - 1) {
      newList = list.slice(0, -1)
    } else if (index === 0) {
      newList = list.slice(1)
    } else {
      newList = [...list.slice(0, index), ...list.slice(index + 1)]
    }

    setList(newList)
  }

  return (
    <div className="listbuilder">
      <h2>List builder:</h2>
      { list.map((item,i) => 
          <ListItem 
            listKey={i}
            key={i}
            value={item}
            updateListItem={updateListItem}
            deleteListItem={deleteListItem}
          />
        )
      }
      <button onClick={() => setList([...list, ""])}>Add</button>
    </div>
  )
}

function ListItem({listKey, value, updateListItem, deleteListItem} : {
  listKey: number,
  value: string,
  updateListItem: (index: number, value: string) => void,
  deleteListItem: (index: number) => void
}) {
  return (
    <div className="listitem">
      <input
        key={listKey}
        value={value}
        onChange={e => updateListItem(listKey, e.target.value)}
      />
      <button onClick={() => deleteListItem(listKey)}>Delete</button>
    </div>
  )
}

export default ListBuilder
import { useState } from "react"

export function ListItem({listKey, value, setListItem, deleteListItem} : {
  listKey: number,
  value: string,
  setListItem: (index: number, value: string) => void,
  deleteListItem: (index: number) => void
}) {
  return (
    <div className="listitem">
      <input
        key={listKey}
        value={String(value)}
        onChange={e => setListItem(listKey, e.target.value)}
      />
      <button onClick={() => deleteListItem(listKey)}>Delete</button>
    </div>
  )
}

export function useList(itemList: Array<string>) : [
  Array<string>,
  Array<JSX.Element>,
  () => void
] {
  const [list, setList] = useState(itemList)

  const setListItem = (index: number, value: string) => {
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

  const addListItem = () => setList([...list, ""])

  let listItemComponents = list.map((item, index) => {
    return <ListItem
      listKey={index}
      key={index}
      value={item}
      setListItem={setListItem}
      deleteListItem={deleteListItem}
    />
  })

  return [list, listItemComponents, addListItem]
}
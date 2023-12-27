import { faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

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
      <button onClick={() => deleteListItem(listKey)}>
        <FontAwesomeIcon icon={faTrashAlt}/>
      </button>
    </div>
  )
}
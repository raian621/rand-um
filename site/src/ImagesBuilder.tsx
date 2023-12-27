import { useEffect } from "react"
import { useList } from "hooks/useList"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

import 'styles/ListBuilder.css'
import { TenorGifPicker } from "./components/TenorGifPicker"

function queryString(list: string[]): string {
  let qstring = "image="
  list.forEach((value) => {
    if (value !== "")
      qstring += `${value},`
  })
  return qstring.slice(0, qstring.length - 1)
}

export default function ImagesBuilder({ setQuery } : {
  setQuery: React.Dispatch<React.SetStateAction<string>>
}) {
  const [list, listItemComponents, addListItem] = useList([
    "https://media.tenor.com/SSY2V0RrU3IAAAAd/rick-roll-rick-rolled.gif",
    "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Labrador_Retriever_portrait.jpg/1920px-Labrador_Retriever_portrait.jpg"
  ])

  useEffect(() => setQuery(queryString(list)), [list, setQuery])

  return (
    <div className="listbuilder">
      { listItemComponents }
      <button onClick={() => addListItem()}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
      <TenorGifPicker/>
    </div>
  )
}
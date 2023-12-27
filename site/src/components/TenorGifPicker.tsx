import { ChangeEvent, useRef, useState } from 'react'
import 'styles/TenorGifPicker.css'
import { ResponseObject, TenorAPI } from '../util/tenor'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { TenorGifGallery } from './TenorGifGallery'

const API_KEY = import.meta.env.VITE_TENOR_API_KEY
const DELTA_MS_FOR_KEY_PRESS = 500

export function TenorGifPicker({ addListItem } : { addListItem: (value?: string) => void}) {
  const [results, setResults] = useState<ResponseObject[]>([])
  const lastKeyPress = useRef<number>(Date.now())
  const tenorAPI = new TenorAPI(API_KEY, "rand-um-client")

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    lastKeyPress.current = Date.now()
    setTimeout(() => {
      if ((Date.now() - lastKeyPress.current) > DELTA_MS_FOR_KEY_PRESS-50) {
        if (e.target.value.length >= 2) {
          tenorAPI.search({
            q: e.target.value,
            limit: 10,
          }).then(response => {
            if (response) {
              setResults(response.results)
            }
          })
        } else {
          setResults([])
        }
      }
    }, DELTA_MS_FOR_KEY_PRESS)
  }

  return (
    <div className="tenor-gif-picker">
      <div className="tenor-search-box">
        <input placeholder="Search Tenor" autoComplete="on" onChange={handleSearchChange}/>
        <FontAwesomeIcon icon={faMagnifyingGlass}/>
      </div>
      <TenorGifGallery results={results} addListItem={addListItem}/>
      <img className="tenor-attribution" src={"https://www.gstatic.com/tenor/web/attribution/PB_tenor_logo_blue_horizontal.svg"}/>
    </div>
  )
}


import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react'
import 'styles/TenorGifPicker.css'
import { ResponseObject, TenorAPI } from '../util/tenor'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const API_KEY = import.meta.env.VITE_TENOR_API_KEY

export function TenorGifPicker() {
  const [results, setResults] = useState<ResponseObject[]>([])
  const searchRef = useRef<HTMLInputElement|null>(null);
  const columns = useMemo(() => {
    if (searchRef) {
      return generateColumns(results)
    }
  }, [results])

  const tenorAPI = new TenorAPI(API_KEY, "rand-um-client")

  useEffect(() => {
    console.log(results)
  }, [results])

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length >= 2) {
      tenorAPI.search({
        q: e.target.value,
        limit: 10,
      }).then(response => {
        if (response) {
          console.log(response)
          setResults(response.results)
        }
      })
    }
  }

  return (
    <div className="tenor-gif-picker">
      <div className="tenor-search-box">
        <input ref={searchRef} placeholder="Search Tenor" autoComplete="on" onChange={handleSearchChange}/>
        <FontAwesomeIcon icon={faMagnifyingGlass}/>
      </div>
      <div className="tenor-search-suggestions">
      </div>
      <div className="tenor-gif-gallery">
        {columns && columns.map((column, i) => {
          return (
            <div key={i} className="tenor-gif-gallery-col">
              {column.map((result => {
                return (
                  <img className="tenor-gif" key={result.id} src={result.media_formats['gif'].url}/>
                )
              }))}
            </div>
          )
        })}
      </div>
      <img className="tenor-attribution" src={"https://www.gstatic.com/tenor/web/attribution/PB_tenor_logo_blue_horizontal.svg"}/>
    </div>
  )
}

function generateColumns(results: ResponseObject[]): ResponseObject[][] {
  const columns = new Array<ResponseObject[]>(2)
  const heights = new Array<number>(2).fill(0)

  for (let i = 0; i < columns.length; i++) {
    columns[i] = new Array<ResponseObject>()
  }

  results.forEach(result => {
    let minCol = 0
    let minHeight = heights[0]

    for (let i = 1; i < columns.length; i++) {
      if (heights[i] < minHeight) {
        minHeight = heights[i]
        minCol = i
      }
    }

    columns[minCol].push(result)
    const [width, height] = result.media_formats['gif'].dims
    heights[minCol] += height / width
  })

  console.log(columns)

  return columns
}
import { useMemo } from 'react'
import { ResponseObject } from '../util/tenor'
import { TenorGif } from './TenorGif'


export function TenorGifGallery({ results, addListItem } : { 
  results: ResponseObject[],
  addListItem: (value?: string) => void
}) {
  const columns = useMemo(() => {
    return generateColumns(results)
  }, [results])

  if (results.length > 0) {
    return (
      <div className="tenor-gif-gallery">
          {columns && columns.map((column, i) => {
            return (
              <div key={i} className="tenor-gif-gallery-col">
                {column.map((result => {
                  return (
                    <TenorGif
                      result={result}
                      key={result.id}
                      onClick={() => {
                        addListItem(result.media_formats['gif'].url)
                      }}
                    />
                  )
                }))}
              </div>
            )
          })}
        </div>
      )
  } else {
    return (
      <div className="tenor-gif-gallery">
        <h2>Find the perfect GIFs using the search bar above</h2>
      </div>
    )
  }
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

  return columns
}
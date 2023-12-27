import { MouseEventHandler, useState } from "react"
import { ResponseObject } from "../util/tenor"

export function TenorGif({result, onClick} : {result: ResponseObject, onClick: MouseEventHandler<HTMLImageElement>}) {
  const [loading, setLoading] = useState(true)

  const { url, dims } = result.media_formats["gif"]
  const [width, height] = dims

  return (
    <>
      <img
        className={loading ? "invisible" : "tenor-gif" }
        src={url}
        onClick={onClick}
        onLoad={() => setLoading(false)}
      />
      <canvas
        className={loading ? "tenor-gif-placeholder" : "invisible" }
        width={`${width}px`}
        height={`${height}px`}
      />
    </>
  )
}
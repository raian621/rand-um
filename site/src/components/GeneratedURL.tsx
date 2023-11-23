import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'styles/GeneratedURL.css'
import { faArrowUpRightFromSquare, faCopy, faRotateRight } from '@fortawesome/free-solid-svg-icons'

export default function GeneratedURL({ uniqueString, refreshUniqueString, query } : {
  uniqueString: string
  refreshUniqueString: () => void
  query: string
}) {
  const url = `${document.URL}${uniqueString}/r?${query}`
  
  return (
    <div className="generated-url">
      <div className="url-wrapper">
        <span className="url">{url}</span>
      </div>
      <button onClick={()=>{ navigator.clipboard.writeText(url) }}>
        <FontAwesomeIcon icon={faCopy}/>
      </button>
      <button onClick={()=>{ refreshUniqueString() }}>
        <FontAwesomeIcon icon={faRotateRight} />
      </button>
      <a href={ url } target="_blank">
        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
      </a>
    </div>
  )
}
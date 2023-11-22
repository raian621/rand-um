import './GeneratedURL.css'

export default function GeneratedURL({ uniqueString, refreshUniqueString, query } : {
  uniqueString: string
  refreshUniqueString: () => void
  query: string
}) {
  const url = `${document.URL}${uniqueString}/r?${query}`
  
  return (
    <div className="generated-url">
      <code>{url}</code>
      <button onClick={()=>{ navigator.clipboard.writeText(url) }}>Copy</button>
      <button onClick={()=>{ refreshUniqueString() }}>Refresh</button>
      <a href={ url } target="_blank">Go</a>
    </div>
  )
}
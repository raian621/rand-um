export default function GeneratedURL({ uniqueString, query } : {
  uniqueString: string
  query: string
}) {
  return (<h3>{`${document.URL}${uniqueString}/r?${query}`}</h3>)
}
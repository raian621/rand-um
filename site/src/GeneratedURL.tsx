export default function GeneratedURL({ uniqueValue, query } : {
  uniqueValue: string
  query: string
}) {
  return (<h3>{`${document.URL}${uniqueValue}/r?${query}`}</h3>)
}
export default function generateUniqueString(timestamp: number) : string {
  // base64 encode a unix timestamp with some random bits appended to the end of
  // it and presto: you have yourself a (questionably) universally unique string
  const rawData = new Array<string>(9)
  
  rawData[0] = String.fromCharCode((timestamp >> 24) & 0xff)
  rawData[1] = String.fromCharCode((timestamp >> 16) & 0xff)
  rawData[2] = String.fromCharCode((timestamp >> 8) & 0xff)
  rawData[3] = String.fromCharCode(timestamp & 0xff)

  for (let i = 4; i < rawData.length; i++) {
    rawData[i] = String.fromCharCode(Math.floor(Math.random() * 256))
  }

  const rawString = rawData.join('')
  const base64string = btoa(rawString).replace(/\//g, '-')

  return base64string
}
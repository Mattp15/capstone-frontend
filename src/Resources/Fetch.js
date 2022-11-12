const Fetch = async (url, method, data) => {
  const rootUrl = 'http://localhost:8000/'
  const res = await fetch(rootUrl + url, {
    method: method,
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  })
  const result = await res.json()
  return result
}
export default Fetch

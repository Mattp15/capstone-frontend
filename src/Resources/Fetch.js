const Fetch = async (url, method, data = '') => {
  const rootUrl = 'http://localhost:8000/'
  let res = ''
  if (method === 'POST' || method === 'PUT') {
    res = await fetch(rootUrl + url, {
      method: method,
      credentials: 'include',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    })
  } else if (method === 'GET') {
    res = await fetch(rootUrl + url, {
      method: method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } else if (method === 'DELETE') {
    res = await fetch(rootUrl + url, {
      method: method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return
  }
  const result = await res.json()
  return result
}
export default Fetch

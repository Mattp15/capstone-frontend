const Fetch = async (url, method, data = '') => {
  const rootUrl = 'https://lettuce-turnip-back.herokuapp.com/'
  let res = ''
  try {
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
    } else if (method === 'DELETE' && data) {
      res = await fetch(rootUrl + url, {
        method: method,
        credentials: 'include',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return true
    } else if (method === 'DELETE' && data.id === 0) {
      res = await fetch(rootUrl + url, {
        method: method,
        credentials: 'include',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return true
    } else if (method === 'DELETE') {
      res = await fetch(rootUrl + url, {
        method: method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return true
    }
    const result = await res.json()
    return result
  } catch (err) {
    // console.log(err)
    const result = {
      status: 0,
    }
    return (result.status = 404)
  }
}
export default Fetch

import defaultFetch from 'node-fetch'

export const fetchAll = async (fetch = defaultFetch) => {
  const res = await fetch('http://localhost:1338/api/v1/narratives')
  return await res.json()
}

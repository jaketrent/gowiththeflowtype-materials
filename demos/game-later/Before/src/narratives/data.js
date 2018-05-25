export const fetchAll = async () => {
  const res = await fetch('http://localhost:1338/api/v1/narratives')
  return await res.json()
}

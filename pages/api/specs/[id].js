import fetch from 'node-fetch'

export default async function handler(req, res) {
  const {id} = req.query
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`
  const data = await fetch(url)
  const result = await data.json()

  res.status(200).json({ data: result })
}
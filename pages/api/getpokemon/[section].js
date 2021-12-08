import fetch from 'node-fetch'

export default async function handler(req, res) {
  const section = req.query.section.split('-')[0]-1
  const data = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${section}&limit=20`)
  const result = await data.json()
  res.status(200).json({ data: result })
}
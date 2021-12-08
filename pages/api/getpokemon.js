// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fetch from 'node-fetch'

export default async function handler(req, res) {
  // const section = req
  console.log('section in getPokemon',req)
  const data = await fetch('https://pokeapi.co/api/v2/pokemon')
  const result = await data.json()
  res.status(200).json({ data: result })
}

import fetch from 'node-fetch'


// SO example
// pages/api/user
// export async function getData() {
//   const response = await fetch(/* external API endpoint */)
//   const jsonData = await response.json()
//   return jsonData
// }

// export default async function handler(req, res) {
//   const jsonData = await getData()
//   res.status(200).json(jsonData)
// }


export default async function handler(req, res) {
  const section = req.query.section.split('-')[0]-1
  const data = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${section}&limit=20`)


  const result = await data.json()
  res.status(200).json({ data: result })
}
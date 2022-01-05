import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from './viewId.module.css'
import Layout from '../../components/layout'



function View(props){
    console.log(props)
    const router = useRouter()
    const info = props.result
    console.log('info in View',info)
    var headerId = ''
    const pokemonId = info.id.toString()
    let name = info.name[0].toUpperCase() + info.name.substring(1)

    if(pokemonId.length == 1){
        headerId = "#00"+pokemonId
    }else if(pokemonId.length == 2){
        headerId = "#0"+pokemonId
    }else{
        headerId = `#${pokemonId}`
    }
    
    return(
        <Layout>
            <Link href='/'>
                <a>Home</a>
            </Link>
            <div>
                <button onClick={() => router.back()}>Back</button>
            </div>

            <br/>
            <h3>{headerId}</h3>
             <h1>{name}</h1>
             <img src={info.sprites.front_default} className={styles.image} alt='pokemon image'></img>
            <h2>{name} is a {info.types.map(types => {return types.type.name + '-'})}type pokemon</h2>
            <div className={styles.row}>
                <div className={styles.col}>
                    <h3>Height: {info.height} meters</h3>
                    <h3>Weight: {info.weight} kg</h3>
                    <h3>Base HP: {info.stats[0].base_stat}</h3>
                    <h3>Base Attack: {info.stats[1].base_stat}</h3>                
                </div>
                <div className={styles.col}>
                    <h3>Base Defense: {info.stats[2].base_stat}</h3>
                    <h3>Base Special Attack: {info.stats[3].base_stat}</h3>
                    <h3>Base Special Defense: {info.stats[4].base_stat}</h3>
                    <h3>Speed: {info.stats[5].base_stat}</h3>                
                </div>                
            </div>
     
        </Layout>
    )
}

// export async function getServerSideProps(ctx) {

//     const {id} = ctx.params
//     const host = 'http://' + ctx.req.headers.host
//     const data = await fetch(`${host}/api/specs/${id}`);
//     const result = await data.json()

//     return {
//       props: {result:result}
//     }
//   }

  View.getInitialProps = async (ctx) => {
    console.log('ctx in pokemonList', ctx)
    const {id} = ctx.query  
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const json = await res.json()
    return { result: json }
  }
  
  export default View
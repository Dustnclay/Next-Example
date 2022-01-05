import Link from 'next/link'
import Head from 'next/head'
import Layout from '../../components/layout'
import PokeCard from '../../components/PokeCard'
// import fetch from 'node-fetch'
import styles from './pokemonList.module.css'
import {useState} from 'react'


 function Pokemon(props) {
    console.log('props',props)
    const [search, setSearch] = useState('')
    let items = props.result.results
    let prev = undefined;
    let prevLink = undefined;
    let nextLink = undefined;
    let next = undefined;
    
    if(props.result.previous){
         prev = parseInt(props.result.previous.split('offset=')[1].split('&')[0])+1       
         prevLink = `/pokemonList/${prev}`

    }
    if(props.result.next){
        next = parseInt(props.result.next.split('offset=')[1].split('&')[0])+1
        nextLink = `/pokemonList/${next}`
    }

    function searchHandler(e){
        if(e.target.value > 0 && e.target.value < 1118 ){
            setSearch(e.target.value)
        }
    }

    return(
        <Layout>
            <Head>
                <title>Pokemon</title>
            </Head>
            
            <Link href='/'>
                <a>Home</a>
            </Link>
            <br/>

            <div>
                <span>search by number </span>
                {/* after 898 it jumps to 10001 */}
                <input placeholder='1 - 1118' type='text' onChange={searchHandler}></input>
                <Link href={search}>Go!</Link>
            </div>

            {prev && <span className={styles.button}>
                <Link className={styles.button} href={prevLink}>prev</Link>
            </span>}
            {next && <span className={styles.button}>
                <Link className={styles.button} href={nextLink}>next</Link>
            </span>} 

            <div className={styles.cardContainer}>
                {items.map((pokemon,id) => {
                    return(
                        <div key={id}>
                            <PokeCard key={id} pokemon={pokemon.name} url={pokemon.url}/>
                        </div>
                )})}
            </div>
            {prev && <Link href={prevLink}>prev</Link>}
            {next && <Link href={nextLink}>next</Link>}
        </Layout>
    )
}

// export async function getServerSideProps(ctx) {
//     const {section} = ctx.params
//     const host = 'http://' + ctx.req.headers.host
//     const data = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${section}&limit=20`)
//     const result = await data.json()

//     return {
//       props: {result}
//     }
//   }

  Pokemon.getInitialProps = async (ctx) => {
    console.log('ctx in pokemonList', ctx)
    const {section} = ctx.query
    // const {host} = ctx.
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${section}&limit=20`)
    const json = await res.json()
    return { result: json }
  }
  
  export default Pokemon
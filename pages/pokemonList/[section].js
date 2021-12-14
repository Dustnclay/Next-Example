import Link from 'next/link'
import Head from 'next/head'
import Layout from '../../components/layout'
import PokeCard from '../../components/PokeCard'
import fetch from 'node-fetch'
import styles from './pokemonList.module.css'
import {useState} from 'react'

export default function Pokemon(props) {

    const [search, setSearch] = useState('')
    let items = props.result.data.results
    let prev = undefined;
    let prevLink = undefined;
    let nextLink = undefined;
    let next = undefined;
    
    if(props.result.data.previous){
         prev = parseInt(props.result.data.previous.split('offset=')[1].split('&')[0])+1       
         prevLink = `/pokemonList/${prev}`

    }
    if(props.result.data.next){
        next = parseInt(props.result.data.next.split('offset=')[1].split('&')[0])+1
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

// export default function getStaticPaths(){
//     const paths = getNextAndPrevPaths()
//     return {
//       paths,
//       fallback: false
//     }
// }

export async function getServerSideProps(ctx) {
    const {section} = ctx.params
    const host = 'http://' + ctx.req.headers.host
    // console.log('host',host)
    const data = await fetch(`${host}/api/getpokemon/${section}`);
    // console.log('data in pokemonlist/section',data)
    const result = await data.json()

    return {
      props: {result}
    }
  }
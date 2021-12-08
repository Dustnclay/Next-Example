import Link from 'next/link'
import Head from 'next/head'
import Layout from '../../components/layout'
import PokeCard from '../../components/PokeCard'
import fetch from 'node-fetch'
import styles from './pokemonList.module.css'

export default function Pokemon(props) {
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


    return(
        <Layout>
            <Head>
                <title>Pokemon</title>
            </Head>
            
            <Link href='/'>
                <a>Home</a>
            </Link>
            <br/>
            {prev && <Link href={prevLink}>prev</Link>}
            {next && <Link href={nextLink}>next</Link>} 
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
    // Get external data from the file system, API, DB, etc.
    const {section} = ctx.params
    const host = 'http://localhost:3000'
    const data = await fetch(`${host}/api/getpokemon/${section}`);
    const result = await data.json()
    // The value of the `props` key will be
    //  passed to the `Home` component
    return {
      props: {result}
    }
  }
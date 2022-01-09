import Link from 'next/link'
import Head from 'next/head'
import Layout from '../../components/layout'
import PokeCard from '../../components/PokeCard'
import styles from './pokemonList.module.css'
import {useState} from 'react'



 function Pokemon(props) {

    const [search, setSearch] = useState('')
    let items = props.result.results
    let prev ;
    let prevLink;
    let nextLink;
    let next ;
    
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

    function submitHandler(e){
        if(e.charCode==13){
            const { href } = window.location;
            window.location.href = `/pokemonList/${search}`;
          }
    }


    return(
        <Layout>
            <Head>
                <title>Pokemon</title>
            </Head>

            <br/>

            <div className={styles.search}>
                <span >Search by Number </span>
                <input className={styles.searchInput} placeholder='1 to 1117' type='text' onChange={searchHandler} onKeyPress={(e) => submitHandler(e)}></input>
                <Link href={`/pokemonList/${search}`}>
                    <a className={styles.goButton}>Go!</a>
                </Link>            
            </div>
            <div className={styles.buttonContainer}>

                {prev && <span className={styles.button}>
                    <Link className={styles.button} href={prevLink}>Previous</Link>
                </span>}
                {next && <span className={styles.button}>
                    <Link className={styles.button} href={nextLink}>Next </Link>
                </span>} 
            </div>

            <div className={styles.cardContainer}>
                {items.map((pokemon,id) => {
                    return(
                        <div key={id}>
                            <PokeCard key={id} pokemon={pokemon.name} url={pokemon.url}/>
                        </div>
                )})}
            </div>
            <div className={styles.buttonContainer}>
                {prev && <span className={styles.button}>
                    <Link className={styles.button} href={prevLink}>Previous</Link>
                </span>}
                {next && <span className={styles.button}>
                    <Link className={styles.button} href={nextLink}>Next</Link>
                </span>}
            </div>
            
        </Layout>
    )
}

  Pokemon.getInitialProps = async (ctx) => {
    let {section} = ctx.query
    section -= 1
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${section}&limit=20`)
    const json = await res.json()
    return { result: json }
  }
  
  export default Pokemon
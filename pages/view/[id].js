import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from './viewId.module.css'
import Layout from '../../components/layout'



function View(props){
    console.log('props', props.result)
    const router = useRouter()
    const info = props.result
    var headerId = ''
    let prev ;
    let prevLink;
    let nextLink;
    let next ;
    const pokemonId = info.id.toString()
    let backId;
    let name = info.name[0].toUpperCase() + info.name.substring(1)
    console.log('pokemonid', pokemonId)
    if(pokemonId.length == 1){
        headerId = "#00"+pokemonId
    }else if(pokemonId.length == 2){
        headerId = "#0"+pokemonId
    }else{
        headerId = `#${pokemonId}`
    }

    if (pokemonId > 1 && pokemonId <= 898){
        prev = parseInt(pokemonId) - 1
        prevLink = `/view/${prev}`
    }
    if (pokemonId < 898) {
        next = parseInt(pokemonId) +1
        nextLink = `/view/${next}`
    }else if (pokemonId == 898 ){
        next = 10001
        nextLink = `/view/${next}`
    }
    if(pokemonId == 10001){
        prev = 898
        next = 900
        prevLink = `/view/${prev}`
        nextLink = `/view/${next}`

    }
    if (pokemonId > 10001 && pokemonId < 10220){
        next = parseInt(pokemonId) + 1
        prev = parseInt(pokemonId) - 1
        nextLink = `/view/${next}`
        prevLink = `/view/${prev}`

    }

    
    if(pokemonId > 898){
        backId = pokemonId - 9102
    }else{
        backId = pokemonId
    }
    
    return(
        <Layout>
            <div className={styles.buttonContainer}>
                <div className={styles.backButton}>
                    <Link  href={`/pokemonList/${backId}`}>Back to List</Link>
                </div>                
            </div>


            <br/>
            <h3>{headerId}</h3>
            <h1 className={styles.h1}>{name}</h1>
            <div className={styles.row}>

            <img src={info.sprites.front_default} className={styles.image} alt='pokemon image'></img>
        
                <div className={styles.col}>

                    <h3>Height: <br/>{info.height} meters</h3>
                    <h3>Weight: <br/>{info.weight} kg</h3>
                    <h3>Base HP: <br/>{info.stats[0].base_stat}</h3>
                    <h3>Base Attack: <br/>{info.stats[1].base_stat}</h3>                
                    <h3>Type: <br/>{info.types.map(types => {return types.type.name + ' '})}</h3>

                </div>
                <div className={styles.col}>
                    <h3>Base Defense: <br/>{info.stats[2].base_stat}</h3>
                    <h3>Base Special Attack: <br/>{info.stats[3].base_stat}</h3>
                    <h3>Base Special Defense: <br/>{info.stats[4].base_stat}</h3>
                    <h3>Speed: <br/>{info.stats[5].base_stat}</h3>                
                </div>                
            </div>

            <div className={styles.buttonContainer}>
                {prev && <span className={styles.button}>
                    <Link className={styles.button} href={prevLink}>Previous</Link>
                </span>}
                {next && <span className={styles.button}>
                    <Link className={styles.button} href={nextLink}>Next </Link>
                </span>} 
            </div>
     
        </Layout>
    )
}

  View.getInitialProps = async (ctx) => {
    const {id} = ctx.query  
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const json = await res.json()
    return { result: json }
  }
  
  export default View
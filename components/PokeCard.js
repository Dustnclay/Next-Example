import styles from './PokeCard.module.css'
import Link from 'next/link'


export default function Pokecard(props){

    let pokemonId = props.url.split('/')[props.url.split('/').length-2].toString()
    let name = props.pokemon[0].toUpperCase() + props.pokemon.substring(1)
    let headerId = '';
    const viewId = `/view/${pokemonId}`
    if(pokemonId.length == 1){
        headerId = "#00"+pokemonId
    }else if(pokemonId.length == 2){
        headerId = "#0"+pokemonId
    }else{
        headerId = `#${pokemonId}`
    }

    return(
          
                <div key={props.pokemon} className={styles.card}>
                    <h3>{headerId}</h3>
                    <h1 className={styles.textCenter}> {name}</h1>
                    <div className={styles.imageContainer}>
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`} ></img>
                    </div>
                    <div className={styles.textCenter}>
                        <Link href={viewId}>View Pokemon</Link>
                    </div>
                </div>  
            

    )
}
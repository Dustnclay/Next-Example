import styles from './PokeCard.module.css'
import Link from 'next/link'


export default function Pokecard(props){
    let pokemonId = props.url.split('/')[props.url.split('/').length-2]
    const viewId = `/view/${pokemonId}`
    console.log('props in pokecard',props.url.split('/')[props.url.split('/').length-2])
    return(
        <div key={props.pokemon} className={styles.card}>
            <h1> {props.pokemon}</h1>
            <img alt={props.url}></img>
            <p>Lorem Ipsum</p>
            <Link href={viewId}>I choose you!</Link>
        </div>
    )
}
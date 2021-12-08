import styles from './PokeCard.module.css'

export default function Pokecard(props){
    return(
        <div key={props.id} className={styles.card}>
            <h1> {props.pokemon}</h1>
            <img alt={props.url}></img>
            <p>Lorem Ipsum</p>
            <button>I choose you!</button>
        </div>
    )
}
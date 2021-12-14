import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from './viewId.module.css'
import Layout from '../../components/layout'



export default function View(props){
    const router = useRouter()
    const info = props.result.data
    var headerId = ''
    const pokemonId = info.order.toString()

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
             <h1>{info.name}</h1>
             <img src={info.sprites.front_default} className={styles.image} alt='pokemon image'></img>
            <h2>{info.name} is a {info.types[0].type.name}-type pokemon</h2>
            <h3>Base Attack:</h3>
            <h3>Base Defense:</h3>
            <h3>Base HP:</h3>
        </Layout>
    )
}

export async function getServerSideProps(ctx) {
    console.log('ctx',ctx)
    console.log('ctx params',ctx.params)
    console.log('ctx stuff',ctx.params.id)
    const {id} = ctx.params
    const host = 'http://' + ctx.req.headers.host
    console.log('host/id in view Id',host+'/api/specs'+id)
    const data = await fetch(`${host}/api/specs/${id}`);
    // console.log('data in pokemonlist/section',data)
    const result = await data.json()

    return {
      props: {result:result}
    }
  }
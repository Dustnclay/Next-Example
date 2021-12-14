import React from 'react'
import Link from 'next/link'


export default function View(props){
    const info = props.result.data
    console.log('props',info)
    return(
        <div>
            <Link href='/'>
                <a>Home</a>
            </Link>
            <br/>
             <h1>{info.order}. {info.name}</h1>
             <img src={info.sprites.front_default} alt='pokemon image'></img>
            <h2>{info.name} is a {info.types[0].type.name}-type pokemon</h2>
        </div>
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
import Link from 'next/link'
import Head from 'next/head'

export default function Pokemon() {
    return(
        <>
            <Head>
                <title>Pokemon</title>
            </Head>
        
            <Link href='/'>
                <a>Home</a>
            </Link>

            <h1>This Pokemon</h1>
            <img alt='pokemon'></img>
            <p>Lorem Ipsum</p>
        </>
    )
}
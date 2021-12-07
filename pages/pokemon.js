import Link from 'next/link'
import Head from 'next/head'
import Layout from '../components/layout'

export default function Pokemon({data}) {
    console.log('data',data)
    return(
        <Layout>
            <Head>
                <title>Pokemon</title>
            </Head>
            
            <Link href='/'>
                <a>Home</a>
            </Link>
            {data.map((pokemon,id) => {
                return(
                    <div id={id}>
                        <h2>{pokemon}</h2>
                    </div>
            )})}
            <h1>This Pokemon</h1>
            <img alt='pokemon'></img>
            <p>Lorem Ipsum</p>
        </Layout>
    )
}
export async function getStaticProps() {
    // Get external data from the file system, API, DB, etc.
    // const data = axios.get('https://pokeapi.co/api/v2/pokemon');
  const data = ['charmander', 'bulbasaur','squirtle']
    // The value of the `props` key will be
    //  passed to the `Home` component
    return {
      props: {data}
    }
  }
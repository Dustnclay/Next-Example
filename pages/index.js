import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
// import Prefetch


export default function Home(data) {
  return (
    <div className={styles.container}>
      <Head>
        <title>PokeApp</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <main className={styles.main}>

      <Image
          src='/images/pokemon-logo.jpg'
          height={284}
          width={544}
          alt='pokemon logo'
        />

        <h1 className={styles.title}>
          Welcome to the Next.js PokeApp
        </h1>
        <Link href="/pokemonList/1">
          <a>View Pokemon Page!</a>
        </Link>

        
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}

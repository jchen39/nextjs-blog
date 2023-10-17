import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import Link from 'next/link';
import utilStyles from '../styles/utils.module.css';

export async function getStaticProps() {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
  const data = await res.json()

  return {
    props: { data }
  }
}

export default function Home({ data }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          (This is a sample website - all data is fetched from{' '}
          <a href="https://pokeapi.co">PokeAPI</a>)
        </p>
      </section>
      <div>
        {data.results.map(pk => (
          <Link href={`/pokemon/${pk.name}`}>
            <h1>{pk.name}</h1>
          </Link>
        ))}
      </div>
      
    </Layout>
  );
}
import Abilities from '../../components/Abilities';
import Types from '../../components/Types';
import Layout from '../../components/layout';
import Head from 'next/head';
import utilStyles from '../../styles/utils.module.css'
import Stats from '../../components/Stats';
import Moves from '../../components/Moves';

export async function getStaticPaths() {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
  const data = await res.json()

  const paths = data.results.map(pk => ({
    params: { id: pk.name, url: pk.url },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`)
  const poke = await res.json()

  return { props: { poke } }
}

const noice = (num) => {
  if (num == 69) {
    return "(nice 😏)"
  }
}

const uppercase = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

export default function Post({ poke }) {
  return (
    <Layout>
      <Head>
        <title>{uppercase(poke.name)}</title>
      </Head>
      <h1 className={utilStyles.center}>Hi I'm {uppercase(poke.name)}!</h1>
      <img className={utilStyles.center} src={poke.sprites.front_default}/>
      <h2>My weight is {poke.weight}{noice(poke.weight)}</h2>
      <h2>My type is:
        {poke.types.map(ty => (
          <Types
            type={ty.type.name}
            typeUrl={ty.type.url}
          />
        ))}
      </h2>
      <h2>My abilities are:
        {poke.abilities.map(ab => (
          <Abilities
            ability={uppercase(ab.ability.name)}
            abilityUrl={ab.ability.url}
            hidden={ab.is_hidden}
          />
        ))}
      </h2>
      <h2>Base Stats:
        <Stats pokemon={poke.name}/>
      </h2>
      <h2>Moves:
        <Moves pokemon={poke.name} />
      </h2>
      
    </Layout>
  );
}
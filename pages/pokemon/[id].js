import Abilities from '../../components/Abilities';
import Types from '../../components/Types';
import Layout from '../../components/layout';
import Head from 'next/head';

/*export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}*/

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

export default function Post({ poke }) {
  return (
    <Layout>
      <Head>
        <title>{poke.name}</title>
      </Head>
      <h1>Hi I'm {poke.name}, my weight is {poke.weight}</h1>
      <img src={poke.sprites.front_default}/>
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
            ability={ab.ability.name}
            abilityUrl={ab.ability.url}
          />
        ))}
      </h2>
      
    </Layout>
  );
}

/*
<article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
*/
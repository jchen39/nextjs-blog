import React, { useEffect, useState } from 'react'
import utilStyles from '../styles/utils.module.css'

function Abilities({ ability, abilityUrl, hidden }) {
  const [data, setData] = useState(null)

  const fetchData = async () => {
    const res = await fetch(abilityUrl)
    const data = await res.json()
    setData(data)
  }

  useEffect(() => {
    fetchData();
  }, [abilityUrl]);

  const getShortEffectForLanguage = (lang) => {
    const entry = data?.effect_entries.find((entry) => entry.language.name === lang);
    return entry ? entry.short_effect : 'Not found';
  };

  const isHidden = (hidden) => {
    if(hidden) {
      return "(hidden)"
    }
  }

  return (
    <div>
      {ability} {isHidden(hidden)}:
      {data ? (
        <div>
         <p className={utilStyles.ability}>{getShortEffectForLanguage('en')}</p>
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  )
}

export default Abilities
import React, { useEffect, useState } from 'react';
import utilStyles from '../styles/utils.module.css'

function Stats({ pokemon }) {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    const data = await res.json();
    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, [pokemon]);

  return (
    <div className={utilStyles.font}>
      {data ? (
        <div>
          {data.stats.map((stat) => (
            <p>{stat.stat.name}: {stat.base_stat}
            <div className={utilStyles.progresscontainer}>
              <div
                className={utilStyles.progress}
                style={{ '--progress-width': `${(stat.base_stat/255)*100}%` }}>
              </div>
            </div>
            </p>
          ))}
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  )
}

export default Stats
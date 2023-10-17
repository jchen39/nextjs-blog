import React, { useEffect, useState } from 'react';
import utilStyles from '../styles/utils.module.css'

function Types({ type, typeUrl }) {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const res = await fetch(typeUrl);
    const data = await res.json();
    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, [typeUrl]);

  return (
    <div style={{display: 'inline-flex'}} className={utilStyles[type]}>
      {type}
    </div>
  )
}

/*
<p>weaknesses:</p>
      {data ? (
        <div className={utilStyles.container}>
          {data.damage_relations.double_damage_from.map((types) => (
            <p className={utilStyles[types.name]}>{types.name}</p>
          ))}
        </div>
      ) : (
        <p>Loading data...</p>
      )}
*/

export default Types
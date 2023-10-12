import React, { useEffect, useState } from 'react';
import utilStyles from '../styles/utils.module.css'

function Types({ type, typeUrl }) {
  const [data, setData] = useState(null);

  // Define a function to fetch data using the apiUrl
  const fetchData = async () => {
    const response = await fetch(typeUrl);
    const jsonData = await response.json();
    setData(jsonData);
  };

  useEffect(() => {
    fetchData();
  }, [typeUrl]);

  return (
    <div className={utilStyles.tooltip}>
      <span> {type} </span>
      <p className={utilStyles.tooltiptext}>{type}</p>
    </div>
  )
}

export default Types
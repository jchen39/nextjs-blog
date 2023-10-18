import React, { useEffect, useState } from 'react';
import utilStyles from '../styles/utils.module.css'
import Types from './Types';
import Image from 'next/image';

function Moves({ pokemon }) {
  const [data, setData] = useState(null);
  const [moveData, setMoveData] = useState([]);

  const fetchData = async () => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    const data = await res.json();
    setData(data);
  };

  const fetchMoveData = async (moveName) => {
    const res = await fetch(`https://pokeapi.co/api/v2/move/${moveName}`);
    const moveInfo = await res.json();

    // Add the moveInfo to the moveData state
    setMoveData((prevMoveData) => [...prevMoveData, moveInfo]);
  };

  useEffect(() => {
    fetchData();
  }, [pokemon]);

  useEffect(() => {
    if (data) {
      // Filter moves that are learned through "level-up"
      const levelUpMoves = data.moves.filter(
        (move) => move.version_group_details[0].move_learn_method.name === "level-up"
      );

      // Fetch additional data for each move
      levelUpMoves.forEach((move) => {
        const moveName = move.move.name;
        const levelLearnedAt = move.version_group_details[0].level_learned_at;
        fetchMoveData(moveName, levelLearnedAt);
      });
    }
  }, [data]);

  const moveType = (type) => {
    switch(type) {
      case 'physical':
        return <Image src='/images/phys.png' width={48} height={48} style={{display: 'inline-flex'}} />
      case 'special':
        return <Image src='/images/special.png' width={48} height={48} style={{display: 'inline-flex'}} />
      case 'status':
        return <Image src='/images/effect.png' width={48} height={48} style={{display: 'inline-flex'}} />
    }
  }

  const uppercase = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1)
  }

  const multiWord = (word) => {
    //return uppercase(word.replace('-', ' '));
    return word.includes('-') ? uppercase(word.split('-')[0]) + ' ' + uppercase(word.split('-')[1]) : uppercase(word)
  }

  return (
    <div className={utilStyles.font}>
      {data ? (
        <div>
          {moveData.map((move) => (
            <p style={{display: 'flex', gap: '8px'}}>
              {multiWord(move.name)}
              <Types 
                type={move.type.name}
                typeUrl={move.type.url}
              />
              {moveType(move.damage_class.name)}
              {move.level_learned_at}
            </p>
          ))}
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  )
}

export default Moves
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Details = () => {
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);
  let { id } = useParams();

  useEffect(() => {
    requestDetails(id);
  }, [id]);

  function requestDetails(pokeId) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setDetails(json);
        setLoading(false);
      });
  }

  if (loading) {
    return <h2>loading … </h2>;
  }

  return (
    <div className="details">
      <h1 className="name">{details.name}</h1>
      <img
        className="poke-img"
        src={details.sprites.other.dream_world.front_default}
        alt={details.name}
      />
      <div className="type">
        <h2 className="title">Tipo:</h2>
        <div className="types">
          {details.types.map((type, index) => (
            <a key={index} href={`/type/${type.type.name}`}>
              <h3 className="type-name">{type.type.name}</h3>
            </a>
          ))}
        </div>
      </div>
      <div className="info">
        <div className="info-list">
          <h2>Experiencia</h2>
          <p>{details.base_experience}</p>
          <h2>Indice de Juego</h2>
          <select className="select-custom">
            {details.game_indices.map((indice, index) => (
              <option key={index} className="options">
                {indice.version.name}
              </option>
            ))}
          </select>
        </div>
        <div className="info-list">
          <h2>Abilidades</h2>
          {details.abilities.map((abili, index) => (
            <p key={index}>{abili.ability.name}</p>
          ))}
        </div>
        <div className="info-list">
          <h2>Movimientos</h2>
          <select className="select-custom">
            {details.moves.map((mov, index) => (
              <option key={index} className="options">
                {mov.move.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Details;

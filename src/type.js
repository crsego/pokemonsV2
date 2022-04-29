import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Type = () => {
  const [type, setType] = useState({});
  const [loading, setLoading] = useState(true);
  let { name } = useParams();

  useEffect(() => {
    requestType(name);
  }, [name]);

  function requestType(pokeType) {
    fetch(`https://pokeapi.co/api/v2/type/${pokeType}`)
      .then((res) => res.json())
      .then((json) => {
        setType(json);
        setLoading(false);
      });
  }

  if (loading) {
    return <h2>loading … </h2>;
  }
  return (
    <div className="details">
      <h1 className="name">{type.name}</h1>
      <h2 className="title">Relaciones De Daño</h2>
      <div className=" ">
        <section className="damages">
          <h3 className="damage-type">Daño Obtenido</h3>
          <div className="table-damage">
            <h4>Doble De:</h4>
            {type.damage_relations.double_damage_from.map(
              (dam, index) => (
                <a key={index} className="a-damage" href={`/type/${dam.name}`}>
                  {dam.name}
                </a>
              )
            )}
          </div>
          <div className="table-damage">
            <h4>Medio De:</h4>
            {type.damage_relations.half_damage_from.map(
              (dam, index) => (
                <a key={index} className="a-damage" href={`/type/${dam.name}`}>
                  {dam.name}
                </a>
              )
            )}
          </div>
          <div className="table-damage">
            <h4>Ninguno De:</h4>
            {type.damage_relations.no_damage_from.map(
              (dam, index) => (
                <a key={index} className="a-damage" href={`/type/${dam.name}`}>
                  {dam.name}
                </a>
              )
            )}
          </div>
        </section>
        <section className="damages">
          <h3 className="damage-type">Daño Dado</h3>
          <div className="table-damage">
            <h4>Doble A:</h4>
            {type.damage_relations.double_damage_to.map(
              (dam, index) => (
                <a key={index} className="a-damage" href={`/type/${dam.name}`}>
                  {dam.name}
                </a>
              )
            )}
          </div>
          <div className="table-damage">
            <h4>Medio A:</h4>
            {type.damage_relations.half_damage_to.map(
              (dam, index) => (
                <a key={index} className="a-damage" href={`/type/${dam.name}`}>
                  {dam.name}
                </a>
              )
            )}
          </div>
          <div className="table-damage">
            <h4>Ninguno A:</h4>
            {type.damage_relations.no_damage_to.map((dam, index) => (
              <a key={index} className="a-damage" href={`/type/${dam.name}`}>
                {dam.name}
              </a>
            ))}
          </div>
        </section>
      </div>
      <h2 className="title">Movimientos</h2>
      <div className="type-moves">
        {type.moves.map((mov, index) => (
          <h4 key={index} className="move-name">
            {mov.name} ,
          </h4>
        ))}
      </div>
      <h2 className="title">Pokemones Tipo {type.name}</h2>
      <div className="pokes">
        {type.pokemon.map((poke, index) => (
          <a
            key={index}
            className="a-pokes"
            href={`/details/${poke.pokemon.name}`}
          >
            {poke.pokemon.name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Type;

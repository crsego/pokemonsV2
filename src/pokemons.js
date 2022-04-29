import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "./features/pokeSlice";

function searchingTerm(term){
  return function(x){
    return x.name.toLowerCase().includes(term) || !term;
  }
}

const PokemonList = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [term, setTerm] = useState("");
  const pokemon = useSelector((state) => state.pokemons.pokemon);
  const next = useSelector((state) => state.pokemons.next);

  var bttnUp = document.getElementById("bttnUp");

  window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    bttnUp.style.display = "block";
  } else {
    bttnUp.style.display = "none";
  }
}

function goTop() {
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

  useEffect(() => {
    setData(pokemon);
  }, [pokemon]);

  useEffect(() => {
    dispatch(getPokemons());
  }, []);

  function handeChange(e) {
    e.preventDefault();
    setTerm(e.target.value);
  }

  async function requestNewPage() {
    dispatch(getPokemons(next));
  }

  return (
    <div className="home">
      <div className="search">
        {data && <input
          value={term}
          onChange={handeChange}
          placeholder="pokemon"
          className="searchInput"
        ></input>}
      </div>
      <div className="pokemon-list">
        {data ? (data.filter(searchingTerm(term)).map((poke, index) => (
          <a href={`/details/${poke.id}`} className="a-list" key={index} >
            <section className="pokemon">
              <h1 className="name">
                #{poke.id} {poke.name}
              </h1>
              <img
                className="poke-img-home"
                src={poke.sprites.other.dream_world.front_default}
                alt={poke.name}
              />
              <div className="type">
                <h2 className="title">Tipo:</h2>
                <div className="types">
                  {poke.types.map((type, index) => (
                    <a key={index} href={`/type/${type.type.name}`}>
                      <h3 className="type-name">{type.type.name}</h3>
                    </a>
                  ))}
                </div>
              </div>
            </section>
          </a>
        ))): <div></div>}
      </div>
      <button onClick={requestNewPage} className="bttnMore">
        Cargar mas
      </button>
      <button onClick={goTop} id="bttnUp" title="ir arriba">▲</button>

    </div>
  );
};
export default PokemonList;

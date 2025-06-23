import {
  GiSpeedometer,
  GiBroadsword,
  GiWeight,
  GiBodyHeight,
} from "react-icons/gi";
import { MdFlashOn } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";

const App = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const API = "https://pokeapi.co/api/v2/pokemon?limit=100";

  const fetchPokemon = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      // console.log(data);

      const detailPokeData = data.results.map(async (curPokemon) => {
        // console.log(curPokemon.url);
        const res = await fetch(curPokemon.url);
        const data = await res.json();
        // console.log(data);
        return data;
      });
      // console.log(detailPokeData);

      const detailedResponses = await Promise.all(detailPokeData);
      // console.log(detailedResponses);
      setPokemon(detailedResponses);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>{error.message}</h1>
      </div>
    );
  }
  // console.log(search);
  // seach function

  const searchData = pokemon.filter((curPokemon) =>
    curPokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen  bg-gradient-to-r from-yellow-300 via-red-400 to-blue-500 p-10">
      <h1 className="text-white text-4xl font-bold drop-shadow-lg text-center my-3">
        Welcome to the Pokémon World!
      </h1>
      <div id="pokemon-search" className=" text-center my-3">
        <input
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search Pokemon"
          value={search}
          className="w-1/2 px-4 py-2 text-base text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
        />
      </div>
      <div>
        <ul className="cards w-full h-full p-0  flex flex-wrap justify-evenly">
          {searchData.map((curPokemon) => {
            return (
              <li key={curPokemon.id}>
                <div className="bg-white/50 backdrop-blur-md rounded-3xl shadow-lg p-6 border border-white/20 hover:scale-105 transition-transform duration-300 w-2xl   max-w-xs m-2 ">
                  <div className="flex justify-center">
                    <img
                      src={curPokemon.sprites.other.dream_world.front_default}
                      alt={curPokemon.forms[0].name}
                      className="w-32 h-32 object-contain rounded-full border-4 border-white shadow-md"
                    />
                  </div>

                  <h2 className="text-center text-2xl font-bold mt-4 capitalize ">
                    {curPokemon.forms[0].name}
                  </h2>

                  <div className="text-center mt-1 text-sm font-medium ">
                    Type:{" "}
                    <span className="capitalize font-bold">
                      {curPokemon.types
                        .map((curType) => curType.type.name)
                        .join(", ")}
                    </span>
                  </div>

                  <div className="m-4 flex flex-wrap justify-evenly align-middle items-center gap-4 text-sm  font-medium ">
                    <div className="flex items-center gap-2">
                      <GiBodyHeight /> {curPokemon.height}
                    </div>
                    <div className="flex items-center gap-2">
                      <GiWeight /> {curPokemon.weight}
                    </div>
                    <div className="flex items-center gap-2">
                      <GiSpeedometer /> {curPokemon.stats[5].base_stat}
                    </div>
                    <div className="flex items-center gap-2">
                      <GiBroadsword /> {curPokemon.stats[1].base_stat}
                    </div>
                    <div className="col-span-2 flex items-center gap-2">
                      <FaStar className="text-amber-400" /> XP:{" "}
                      {curPokemon.base_experience}
                    </div>
                    <div className="col-span-2 flex items-center gap-2">
                      <MdFlashOn className="text-purple-400" /> Ability:{" "}
                      {curPokemon.abilities
                        .map((abilityInfo) => abilityInfo.ability.name)
                        .slice(0, 1)
                        .join(", ")}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default App;

import pokedex from './images/pokedex.png'
import './styles/global.css'
import {
  ChangeEvent,
  MouseEventHandler,
  useEffect,
  useLayoutEffect,
  useState
} from 'react'
import axios from 'axios'

type PokeProps = {
  name: string
  sprite: string
  id: number
}

export function App() {
  const [pokes, setPokes] = useState<PokeProps | null>(null)
  const [pokeName, setPokeName] = useState<string | undefined>('')

  const [searchPokemon, setSearchPokemon] = useState(1)

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${searchPokemon}`)
      .then(response => response.json())
      .then(data => {
        setPokes({
          name: data.name,
          sprite:
            data.sprites.versions['generation-v']['black-white'].animated
              .front_default,
          id: data.id
        })
        if (pokes) {
        }
      })
  }, [searchPokemon])

  function handleClick() {
    setSearchPokemon(searchPokemon + 1)
  }
  function handleClick2() {
    if (searchPokemon > 1) {
      setSearchPokemon(searchPokemon - 1)
    }
  }

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
      .then(response => response.json())
      .then(data => {
        setPokes({
          name: data.name,
          sprite:
            data.sprites.versions['generation-v']['black-white'].animated
              .front_default,
          id: data.id
        })
      })
  }, [pokeName])

  return (
    <section className="w-screen h-screen bg-gradient-to-br from-indigo-400 flex flex-col items-center justify-center text-gray-100 p-2">
      <div className="relative">
        <img
          className="absolute bottom-[50%] left-[38%] h-[20%] -translate-x-[13%] "
          src={pokes?.sprite}
          alt=""
        />

        <h1 className="absolute font-semibold text-gray-500 top-[55%] right-[25%] text-dina">
          <span className="text-gray-500"> {pokes?.id} </span> -
          <span className="capitalize text-gray-600"> {pokes?.name}</span>
        </h1>

        <form className="absolute w-[65%] top-2/3 left-[13.5%]">
          <input
            className="w-full p-[4%] outline-none font-semibold border-[2px] rounded border-b-gray-500 text-gray-700 text-dina2 shadow-shado"
            type="search"
            placeholder="Name or Number"
            required
            value={pokeName}
            onChange={e => setPokeName(e.target.value)}
          />
        </form>
        {/* onClick={() => setSearhPokemon(searhPokemon + 1)} */}
        <div className="flex absolute bottom-[10%] left-[50%] w-[65%] gap-5 -translate-x-[57%] translate-y-0 justify-center">
          <button
            className="w-[50%] p-[4%] border-[2px] border-gray-800 rounded text-dina2 font-semibold text-white bg-[#444] shadow-shado2 active:text-[0.9rem] active:shadow-shado3"
            onClick={handleClick2}
          >
            &lt; Prev
          </button>
          <button
            className="w-[50%] p-[4%] border-[2px] border-gray-800 rounded text-dina2 font-semibold text-white bg-[#444] shadow-shado2 active:text-[0.9rem] active:shadow-shado3"
            onClick={handleClick}
          >
            Next &gt;
          </button>
        </div>

        <img className="" src={pokedex} alt="pokedex" />
      </div>
      <script type="module" src="/src/js/script.jsx"></script>
    </section>
  )
}

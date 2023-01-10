import { useFetch } from './hooks/useFetch'
import pokedex from './images/pokedex.png'
import './styles/global.css'

type Repository = {
  full_name: string
  description: string
}

export function App() {
  const { data } = useFetch<Repository[]>('https:// pokeapi.co/api/v2/pokemon')

  return (
    <section className="w-screen h-screen bg-gradient-to-br from-indigo-400 flex flex-col items-center justify-center text-gray-100 p-2">
      <div className="relative">
        <img
          className="absolute bottom-[50%] left-[38%] h-[20%] -translate-x-[13%] "
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/6.gif"
          alt=""
        />

        <h1 className="absolute font-semibold text-gray-500 top-[55%] right-[25%] text-dina">
          <span className="text-gray-500">6</span> -
          <span className="capitalize text-gray-600"></span>
        </h1>

        <form className="absolute w-[65%] top-2/3 left-[13.5%] ">
          <input
            className="w-full p-[4%] outline-none font-semibold border-[2px] rounded border-b-gray-500 text-gray-700 text-dina2 shadow-shado"
            type="search"
            placeholder="Name or Number"
            required
          />
        </form>

        <div className="flex absolute bottom-[10%] left-[50%] w-[65%] gap-5 -translate-x-[57%] translate-y-0 justify-center">
          <button className="w-[50%] p-[4%] border-[2px] border-gray-800 rounded text-dina2 font-semibold text-white bg-[#444] shadow-shado2 active:text-[0.9rem] active:shadow-shado3">
            &lt; Prev
          </button>
          <button className="w-[50%] p-[4%] border-[2px] border-gray-800 rounded text-dina2 font-semibold text-white bg-[#444] shadow-shado2 active:text-[0.9rem] active:shadow-shado3">
            Next &gt;
          </button>
        </div>

        <img className="" src={pokedex} alt="pokedex" />
      </div>
      <script type="module" src="/src/js/script.jsx"></script>
    </section>
  )
}

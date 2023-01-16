import { useEffect, useState } from 'react'
import pokedex from '../images/pokedex.png'
import api from '../services/api'

type PokeProps = {
  name: string
  id?: number
  sprite: string
}

export function Pokedex() {
  const [poke, setPoke] = useState<PokeProps | null>(null)
  const [pokeId, setPokeId] = useState<number>(1)
  const [pokeName, setPokeName] = useState<string>('')

  const callApi = async (search = '') => {
    try {
      const searchInt = parseInt(search, 10)
      if (searchInt >= 649) {
        throw new Error('id inválido')
      }

      const response = search
        ? await api.get(`/${search}`)
        : await api.get(`/${pokeId}`)

      const { data } = response

      setPoke({
        name: data.name,
        id: data.id,
        sprite:
          data.sprites.versions['generation-v']['black-white'].animated
            .front_default
      })
      setPokeId(data.id)
    } catch (error) {
      setPoke({
        name: 'Não Encontrado',
        sprite:
          'https://www.pinclipart.com/picdir/big/559-5592431_pokemon-unown-exclamation-mark-unknown-pokemon-question-mark.png'
      })
      setPokeId(0)
    }
  }

  useEffect(() => {
    callApi()
  }, [pokeId])

  return (
    <section className="w-screen h-screen bg-gradient-to-br from-indigo-400 flex flex-col items-center justify-center text-gray-100 p-2">
      <div className="relative">
        <img
          className="absolute bottom-[50%] left-[38%] h-[20%] -translate-x-[13%] "
          src={poke?.sprite}
          alt=""
        />

        <h1 className="absolute font-semibold text-gray-500 top-[55%] right-[25%] text-dina">
          <span className="text-gray-500">{poke?.id}</span>
          {poke?.id && ' - '}
          <span className="capitalize text-gray-600">{poke?.name}</span>
        </h1>

        <form className="absolute w-[65%] top-2/3 left-[13.5%]">
          <input
            className="w-full p-[4%] outline-none font-semibold border-[2px] rounded border-b-gray-500 text-gray-700 text-dina2 shadow-shado"
            type="search"
            placeholder="Name or Number"
            required
            value={pokeName}
            onChange={e => setPokeName(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault()
                callApi(pokeName)
                setPokeName('')
              }
            }}
          />
        </form>

        <div className="flex absolute bottom-[10%] left-[50%] w-[65%] gap-5 -translate-x-[57%] translate-y-0 justify-center">
          <button
            className="w-[50%] p-[4%] border-[2px] border-gray-800 rounded text-dina2 font-semibold text-white bg-[#444] shadow-shado2 active:text-[0.9rem] active:shadow-shado3"
            onClick={() => {
              if (pokeId <= 1) return
              setPokeId(prev => prev - 1)
            }}
          >
            &lt; Prev
          </button>
          <button
            className="w-[50%] p-[4%] border-[2px] border-gray-800 rounded text-dina2 font-semibold text-white bg-[#444] shadow-shado2 active:text-[0.9rem] active:shadow-shado3"
            onClick={() => {
              if (pokeId >= 649) return
              setPokeId(prev => prev + 1)
            }}
          >
            Next &gt;
          </button>
        </div>

        <img className="" src={pokedex} alt="pokedex" />
      </div>
    </section>
  )
}

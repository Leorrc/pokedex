import { useEffect, useState } from 'react'
import pokedex2 from '../images/q3.png'
import { pokemonTypes } from '../pokemonTypes'
import api from '../services/api'
import { Pokemon } from '../types/Pokemon'
import { FaUndo } from 'react-icons/fa'

import '../styles/global.css'

export function Pokedex(props: Pokemon) {
  const [poke, setPoke] = useState<Pokemon | null>(null)
  const [pokeId, setPokeId] = useState<number>(1)
  const [pokeName, setPokeName] = useState<string>('')
  const [isShiny, setIsShiny] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [back, setBack] = useState(false)

  const callApi = async (search = '') => {
    setIsLoading(true)
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
        spriteFront:
          data.sprites.versions['generation-v']['black-white'].animated
            .front_default,
        spriteBack:
          data.sprites.versions['generation-v']['black-white'].animated
            .back_default,
        shiny:
          data.sprites.versions['generation-v']['black-white'].animated
            .front_shiny,
        types: data.types,
        stats: data.stats
      })
      setPokeId(data.id)
    } catch (error) {
      setPoke({
        name: 'Não Encontrado',
        spriteFront:
          'https://www.pinclipart.com/picdir/big/559-5592431_pokemon-unown-exclamation-mark-unknown-pokemon-question-mark.png'
      })
      setPokeId(0)
    }
    setIsLoading(false)
  }

  const handleReset = () => {
    setPokeId(1)
    setIsShiny(false)
  }

  useEffect(() => {
    callApi()
  }, [pokeId])

  return (
    <section className="bg-hero bg-auto bg-center w-screen h-screen flex flex-col items-center text-gray-100">
      <div className="relative mt-28">
        <img
          className="absolute bottom-[45%] left-[21.5%] h-[20%] -translate-x-[13%] "
          src={isShiny ? poke?.shiny : poke?.spriteFront}
          alt=""
        />
        {/* <button
          className="absolute top-[85.5%] right-[34%] p-[1%] border-[2px] border-gray-800 rounded text-dina4 font-semibold text-white bg-[#444] shadow-shado2 active:text-[0.9rem] active:shadow-shado4"
          onClick={() => {
            setPoke()
          }}
        >
          <FaUndo className="text-[24px] " />
        </button> */}
        <button
          className="absolute top-[85.5%] right-[28%] p-[1%] border-[2px] border-gray-800 rounded text-dina4 font-semibold text-white bg-[#444] shadow-shado2 active:text-[0.9rem] active:shadow-shado4"
          onClick={() => {
            setIsShiny(prev => !prev)
          }}
        >
          Shiny ✨
        </button>

        <button
          className="absolute top-[85.5%] right-[8%] p-[1%] border-[2px] border-gray-800 rounded text-dina4 font-semibold text-white bg-[#444] shadow-shado2 active:text-[0.9rem] active:shadow-shado4"
          onClick={handleReset}
        >
          Reset
        </button>

        <h1 className="absolute font-semibold text-gray-500 top-[61.5%] right-[59%] text-dina capitalize">
          {isLoading ? (
            <span className="capitalize text-gray-600 ">Loading...</span>
          ) : (
            <>
              <span className="text-gray-500 capitalize">{poke?.id}</span>
              {poke?.id && ' - '}
              <span className="uppercase text-gray-600">{poke?.name}</span>
            </>
          )}
        </h1>

        <form className="absolute w-[38%] top-[72.5%] left-[7%]">
          <input
            className="w-full p-[3%] outline-none font-semibold border-[2px] rounded border-b-gray-500 text-gray-700 text-dina2 shadow-shado"
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

        <div className="flex absolute bottom-[8%] left-[28%] w-[30%] gap-5 -translate-x-[57%] translate-y-0 justify-center">
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

        <div className="absolute uppercase font-semibold top-[28.7%] right-[19%] text-dina">
          types
        </div>

        <div className="absolute top-[35.5%] right-[8%] w-[31%] h-[15%] ">
          <div className="flex flex-col items-center justify-center w-full h-full">
            {poke?.types?.map((t: any) => (
              <span className="uppercase font-semibold text-dina3">
                {t.type.name}
              </span>
            ))}
          </div>
        </div>

        <div className="absolute uppercase font-semibold top-[51.5%] right-[19%] text-dina">
          stats
        </div>

        <div className="absolute top-[57%] right-[7.2%] stats text-white">
          <ul className="flex flex-col ">
            {poke?.stats?.map((s1: any) => (
              <span className="stat-line">{s1.stat.name}</span>
            ))}
          </ul>

          <ul className="flex flex-col ">
            {poke?.stats?.map((s2: any) => (
              <span className="stat-line">{s2.base_stat}</span>
            ))}
          </ul>
        </div>

        <img src={pokedex2} alt="" />
      </div>
    </section>
  )
}

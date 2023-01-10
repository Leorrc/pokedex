const pokemonName = document.querySelector('')

const fetchPokemon = async pokemon => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  )
  const data = APIResponse.json()
  return data
}

const renderPokemon = async pokemon => {
  const data = await fetchPokemon(pokemon)

  console.log(data)
}

renderPokemon('25')

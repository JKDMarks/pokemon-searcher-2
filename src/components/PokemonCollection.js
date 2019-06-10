import React from 'react'
import PokemonCard from './PokemonCard'
import { Card } from 'semantic-ui-react'

class PokemonCollection extends React.Component {
  pokemonCards = () => (
    this.props.pokemons.map(pokemon => (
      <PokemonCard key={pokemon.id} pokemon={pokemon} />
    ))
  )

  render() {
    console.log("PokeColl props", this.props)

    return (
      <Card.Group itemsPerRow={6}>
        {this.pokemonCards()}
      </Card.Group>
    )
  }
}

export default PokemonCollection

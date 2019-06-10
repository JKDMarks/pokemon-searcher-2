import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search, Dropdown } from 'semantic-ui-react'
import _ from 'lodash'

class PokemonPage extends React.Component {
  state = {
    pokemons: [],
    pokemonsFiltered: [],
    value: "",
    searchBy: "",
    types: []
  }

  componentDidMount() {
    fetch("http://localhost:3000/pokemon")
      .then(r => r.json())
      .then(pokemonsData => {
        this.setState({pokemons: pokemonsData})
        return pokemonsData
      })
      .then(pokemonsData => {
        this.getPokemonTypes(pokemonsData)
      })
  }


  getPokemonTypes = pokemonsData => {
    const pokemonTypes = []

    pokemonsData.forEach(pokemon => {
      if (pokemon.types) {
        pokemon.types.forEach(type => {
          if (!pokemonTypes.includes(type)) {
            pokemonTypes.push(type)
          }
        })
      }
    })

    this.setState({types: pokemonTypes})

    const dropdownOptions = [
      {

        text: "name",
        value: "name"
      }, {
        text: "type",
        value: "type"
      }
    ]
  }


  handleSearch = (e, {value}) => {
    console.log("handleSearch e & value: ", e, value)
    const filteredCards = this.state.pokemons.filter(card => (
      card.name.includes(value)
    ))

    console.log("handleSearch filteredCards: ", filteredCards)
    this.setState({pokemonsFiltered: filteredCards})
  }


  addPokemon = e => {
    e.preventDefault()
    const newPokeObj = {
      name: e.target.name.value,
      stats: [{
        name: "hp",
        value: parseInt(e.target.hp.value, 10)
      }],
      sprites: {
        front: e.target.frontUrl.value,
        back: e.target.backUrl.value
      }
    }

    console.log("newPokeObj: ", newPokeObj)
    fetch("http://localhost:3000/pokemon", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPokeObj)
    })
      .then(r => r.json())
      .then(newPoke => this.setState({
        pokemons: [...this.state.pokemons, newPoke]
      }))
  }

  handleChange = e => {
    const option = e.target.firstElementChild.innerText

    const filterByType = this.state.pokemons.filter(pokemon => {
      if (pokemon.types) {
        return pokemon.types.includes(option)
      }
    })

    console.log(filterByType)
    this.setState({pokemonsFiltered: filterByType})
  }


  render() {
    console.log("App state: ", this.state)

    const dropdownOptions = this.state.types.map(type => {
      return {
        text: type,
        value: type
      }
    })

    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Dropdown
          onChange={this.handleChange}
          placeholder='Filter by type'
          search selection options={dropdownOptions} />
        <Search
          onSearchChange={_.debounce(this.handleSearch, 500)}
          showNoResults={false} />
        <br />
        <PokemonCollection
          pokemons={
            this.state.pokemonsFiltered.length > 0 ?
            this.state.pokemonsFiltered :
            this.state.pokemons
          } />
        <br />
        <PokemonForm addPokemon={this.addPokemon}/>
      </div>
    )
  }
}

export default PokemonPage

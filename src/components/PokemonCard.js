import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {
  state = {
    clicked: false
  }

  getHpStat = stats => {
    return stats.find(stat => stat['name'] === "hp").value
  }

  flipPokeImg = () => (
    // console.log("flipped 🤙")
    this.setState({clicked: !this.state.clicked})
  )

  render() {
    // console.log("PokeCard props: ", this.props)
    const {name, sprites, stats} = this.props.pokemon

    return (
      <Card onClick={this.flipPokeImg}>
        <div>
          <div className="image">
            {
              this.state.clicked ?
              <img src={sprites.back} alt={name + " back"} /> :
              <img src={sprites.front} alt={name + " front"} />
            }
            {
              /* <img
              src={this.state.clicked ? sprites.back : sprites.front}
              alt={this.state.clicked ? name + "back" : name + " front"} /> */
            }
          </div>
          <div className="content">
            <div className="header">
              {name}
            </div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {this.getHpStat(stats)} hp
            </span>
          </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard

import React from 'react';
import logo from './logo.svg';
import './App.css';

class Player extends React.Component {
  render() {
    return <div className={"player-" + this.props.orientation}>
      <Card of={this.props.player} />
    </div>
  }
}

class Card extends React.Component {
  render() {
    return <img className="card" src={"/cards/" + this.props.of + ".svg"} />
  }
}

function bezier(t) {
  return t * t * (3.0 - 2.0 * t);
}
class Cards extends React.Component {
  render() {
    return this.props.cards.map((card, index) => {
      let len = this.props.cards.length;
      let proportion = (index + 0.5) / len;
      let rotation = -10 + 20 * proportion;
      let margin = Math.abs(20 * ((index + 0.5) - (0.5 * len)));
      return <div className="card-clickable" style={
        {"transform": `rotate(${rotation}deg)`,
      "margin-top": `${margin}px`}
        }>
        <Card of={card}/>
      </div>
    })
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, players: ["4H", "4H", "4H", "4H"], 
    cards: ["4H", "KD", "TC", "AC"], thisPlayer: 0 };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div className="game">
        <div className="header">
          Your Team 1-2 Opponent Team
        </div>
        {this.getPlayers()}
        <div className="footer">
          <Cards cards={this.state.cards} />
        </div>
      </div>
    );
  }

  getPlayers() {
    let bottom = this.state.thisPlayer;
    let top = 0;
    let left = 0;
    let right = 0;
    if (bottom == 0) {
      top = 1;
      left = 2;
      right = 3;
    } else if (bottom == 1) {
      top = 0;
      left = 2;
      right = 3;
    } else if (bottom == 2) {
      top = 3;
      left = 0;
      right = 1;
    } else if (bottom = 3) {
      top = 2;
      left = 0;
      right = 1;
    }
    let { players } = this.state;
    top = players[top];
    left = players[left];
    right = players[right];
    bottom = players[bottom];
    return (
      <>
        <Player orientation="top" player={top} />
        <Player orientation="left" player={left} />
        <Player orientation="right" player={right} />
        <Player orientation="bottom" player={bottom} />
      </>
    )
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.text.length === 0) {
      return;
    }
    const newItem = {
      text: this.state.text,
      id: Date.now()
    };
    this.setState(state => ({
      items: state.items.concat(newItem),
      text: ''
    }));
  }
}

export default App;

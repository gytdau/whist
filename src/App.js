import React from 'react';
import logo from './logo.svg';
import './App.css';

class Player extends React.Component {
  render() {
    return <div className={"player-" + this.props.orientation}>
      <Card of={this.props.player}/>
    </div>
  }
}

class Card extends React.Component {
  render() {
    return <img className="card" src="/cards/2H.svg"/>
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, players: ["a", "b", "c", "d"], thisPlayer: 0};
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
          A
        </div>
      </div>
    );
  }

  getPlayers() {
    let bottom = this.state.thisPlayer;
    let top = 0;
    let left = 0;
    let right = 0;
    if(bottom == 0) {
      top = 1;
      left = 2;
      right = 3;
    } else if(bottom == 1) {
      top = 0;
      left = 2;
      right = 3;
    } else if(bottom == 2) {
      top = 3;
      left = 0;
      right = 1;
    } else if(bottom = 3) {
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
        <Player orientation="top" player={top}/>
        <Player orientation="left" player={left}/>
        <Player orientation="right" player={right}/>
        <Player orientation="bottom" player={bottom}/>
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

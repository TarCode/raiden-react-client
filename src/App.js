import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    loading: false,
    address: null
  }
  componentDidMount() {
    this.setState({ loading: true })
    fetch('http://localhost:3001/address', {
      mode: 'cors'
    })
    .then(res => res.json())
    .then(json => {
      this.setState({ loading: false, address: json.our_address})
    })
    
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            <code>Raiden address: </code>
          </p>
          {this.state.address}
        </header>
      </div>
    );
  }
}

export default App;

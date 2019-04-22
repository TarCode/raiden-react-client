import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    loading: false,
    address: null,
    channels: []
  }

  async componentDidMount() {
    this.setState({ loading: true })
    const res = await fetch('http://localhost:3001/address')
    const address = await res.json();

    const channel_res = await fetch('http://localhost:3001/channels')
    const channels = await channel_res.json();

    this.setState({ loading: false, address: address.our_address, channels })
    
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            <code>Raiden address: </code>
          </p>
          {this.state.address}
          <br/>
          {
            this.state.channels.length > 0 ?
            <div>
              <code>Channels:</code>
              {
                this.state.channels.map((c, i) => (
                  <div key={i}>
                    <h4>{c.toString()}</h4>
                  </div>
                ))
              }
            </div> :
            null
          }
        </header>
      </div>
    );
  }
}

export default App;

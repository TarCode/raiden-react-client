import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    loading: false,
    address: null,
    channels: [],
    tokens: [],
    token_address: ''
  }

  async componentDidMount() {
    this.setState({ loading: true })
    
    const address = await this.getAddress();
    const channels = await this.getChannels();
    const tokens = await this.getTokens();
    

    this.setState({ loading: false, address: address.our_address, channels, tokens })
    
  }

  getAddress = async () => {
    const res = await fetch('http://localhost:3001/address')
    const address = await res.json();
    return address;
  }

  getChannels = async () => {
    const channel_res = await fetch('http://localhost:3001/channels')
    const channels = await channel_res.json();
    return channels;
  }

  getTokens = async () => {
    const token_res = await fetch('http://localhost:3001/tokens')
    const tokens = await token_res.json();
    return tokens;
  }

  registerToken = async (e) => {
    e.preventDefault();
    this.setState({ loading: true })

    const token_res = await fetch('http://localhost:3001/tokens', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
    },
      body: JSON.stringify({ token_address: this.state.token_address})
    })
    const msg = await token_res.json();

    console.log("MSG", msg);
    

    this.setState({ loading: false, msg })
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
          <input value={this.state.token_address} onChange={e => this.setState({ token_address: e.target.value })} id="token_address"/>
          <button onClick={this.registerToken}>Register token</button>
          <br/>
          {
            this.state.tokens.length > 0 ?
            <div>
              <code>Tokens:</code>
              {
                this.state.tokens.map((t, i) => (
                  <div key={i}>
                    <h4>{t.toString()}</h4>
                  </div>
                ))
              }
            </div> :
            null
          }
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

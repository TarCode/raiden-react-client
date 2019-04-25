import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    loading: false,
    address: null,
    channels: [],
    tokens: [],
    token_address: '',
    amount: '',
    target_address: '',
    connections: {}
  }

  async componentDidMount() {
    this.setState({ loading: true })
    
    const address = await this.getAddress();
    const channels = await this.getChannels();
    const tokens = await this.getTokens();
    const connections = await this.getConnections();
    

    this.setState({ loading: false, address: address.our_address, channels, tokens, connections })
    
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

  getConnections = async () => {
    const connection_res = await fetch('http://localhost:3001/connections')
    const connections = await connection_res.json();
    return connections;
  }

  createPayment = async (token_address, identifier) => {
    this.setState({ loading: true })

    const token_res = await fetch('http://localhost:3001/payments', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
    },
      body: JSON.stringify({ 
        token_address,
        identifier,
        target_address: this.state.target_address,
        amount: this.state.amount
      })
    })
    const msg = await token_res.json();

    console.log("PAY MSG", msg);
    

    this.setState({ loading: false, msg })
  }

  createConnection = async (token_address) => {
    this.setState({ loading: true })

    const token_res = await fetch('http://localhost:3001/connections', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
    },
      body: JSON.stringify({ token_address, funds: this.state.amount})
    })
    const msg = await token_res.json();

    console.log("CONNECTION MSG", msg);
    

    this.setState({ loading: false, msg })
  }

  deleteConnection = async (token_address) => {
    this.setState({ loading: true })

    const token_res = await fetch('http://localhost:3001/delete-connection', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
    },
      body: JSON.stringify({ token_address })
    })
    const msg = await token_res.json();

    console.log("CONNECTION MSG", msg);
    

    this.setState({ loading: false, msg })
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

  createChannel = async (e) => {
    e.preventDefault();
    this.setState({ loading: true })

    const token_res = await fetch('http://localhost:3001/channels', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
    },
      // body: JSON.stringify({ token_address: this.state.token_address})
    })
    const msg = await token_res.json();

    console.log("MSG", msg);
    

    this.setState({ loading: false, msg })
  }

  closeChannel = async (token_address, partner_address) => {
    this.setState({ loading: true })

    const token_res = await fetch('http://localhost:3001/close-channel', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
    },
      body: JSON.stringify({ token_address, partner_address })
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
          <button onClick={this.createChannel}>Create Channel</button>
          <br/>
          {
            this.state.tokens.length > 0 ?
            <div>
              <code>Tokens:</code>
              {
                this.state.tokens.map((t, i) => (
                  <div key={i}>
                    <h4>{t.toString()}</h4>
                    <button onClick={() => {
                      this.deleteConnection(t);
                    }}>Delete connection</button>
                  </div>
                ))
              }
            </div> :
            null
          }
          <br/>
          {
            Object.keys(this.state.channels).length > 0 ?
            <div>
              <code>Channels:</code>
              {
                this.state.channels.map((c, i) => (
                  <div key={i}>
                    <h4>{c.partner_address}</h4>
                    <h2>Balance: {c.balance}</h2>
                    <h2>Total deposit: {c.total_deposit}</h2>
                    <input placeholder="Amount" value={this.state.amount} onChange={e => this.setState({ amount: e.target.value })}/>
                    <input placeholder="Target address" value={this.state.target_address} onChange={e => this.setState({ target_address: e.target.value })}/>
                    <button onClick={() => {
                      this.createPayment(c.token_address, c.identifier);
                    }}>Create Payment</button>
                    <button onClick={() => {
                      this.createConnection(c.token_address);
                    }}>Create Connection</button>
                    <button onClick={() => {
                      this.closeChannel(c.token_address, c.partner_address);
                    }}>Close channel</button>
                  </div>
                ))
              }
            </div> :
            null
          }
          {
            Object.keys(this.state.connections).length > 0 ?
            <div>
              <code>Connections:</code>
              {
                Object.keys(this.state.connections).map((t, i) => (
                  <div key={i}>
                    <h4>{t}</h4>
                    <p>Funds: {this.state.connections[t].funds}</p>
                    <p>Sum deposits: {this.state.connections[t].sum_deposits}</p>
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

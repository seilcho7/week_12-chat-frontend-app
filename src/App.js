import React from 'react';
import './App.css';
import ChatList from './ChatList';
import axios from 'axios';
import ChatForm from './ChatForm';

import qs from 'qs';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      text: ''
    };
  }


  componentDidMount() {
    const url = 'ws://radishmouse.local:31337/chat';
    // const url = 'ws://localhost:3001/chat';
    // can't use the CRA proxy because of a bug
    this.connection = new WebSocket(url);

    this.connection.onmessage = (e) => {
      console.log(e.data);
      const newData = JSON.parse(e.data);
      this.setState({
        messages: this.state.messages.concat(newData)
      });
      // .concat will handle both arrays and individual messages
      // if (this.state.messages.length === 0) {
      //   this.setState({
      //     messages: JSON.parse(e.data)
      //   })
      // } else {
      //   this.setState({
      //     messages: [...this.state.messages, JSON.parse(e.data)]
      //   })
      // }
    };

    // setInterval(async () => {
    //   const { data } = await axios.get('/api');
    //   // console.log(data);
    //   this.setState({
    //     messages: data
    //   });
    // }, 1000)
  }

  render() {
    return (
      <div className="App">
        <h2>Chat-App</h2>
        <div className="chatbox">
          <ChatList messages={this.state.messages}/>
        </div>
        <ChatForm text={this.state.text} handleChange={this._setText} handleSend={this._sendMessage}/>
      </div>
    );
  }

  _setText = (text) => {
    console.log("App: _setTex got called");
    this.setState({
      text
    })
  }

  _sendMessage = async () => {
    console.log("App: _sendMessage got called");
    this.connection.send(JSON.stringify({
      message: this.state.text
    }))
    // await axios({
    //   method: 'post',
    //   url: '/api',
    //   data: qs.stringify({
    //     message: this.state.text
    //   }),
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   }
    // });
    this.setState({
      text: ''
    })
  }
}

export default App;

import React from 'react';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import AddMessage from "./components/addMessage";

class App extends React.Component {
  componentDidMount(){
    const chatManager = new ChatManager({
      instanceLocator: 'v1:us1:9928246a-b97e-4ddf-8d70-3e9d2f36bf54',
      userId: 'diana',
      tokenProvider: new TokenProvider({ url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/9928246a-b97e-4ddf-8d70-3e9d2f36bf54/token' })
    })

    chatManager.connect()
      .then(currentUser => {
        console.log('Successful connection', currentUser)
      })
      .catch(err => {
        console.log('Error on connection', err)
      })
  }

  render(){
    return (
      <div className="App">
        <AddMessage />
      </div>
    );
  }
}

export default App;

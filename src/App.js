import React from 'react';
import { ChatManager } from '@pusher/chatkit-client';
import Chatkit from "@pusher/chatkit-client";
import AddMessage from "./components/addMessage";
import ShowMessages from "./components/showMessages";
import ShowRooms from "./components/showRooms";
import AddRoom from "./components/addRoom";

class App extends React.Component {

  state = {
    currentRoomId: "6064da57-cffe-4c90-8840-e86f560fa150",
    messages: [],
    rooms: []
  }

  componentDidMount(){
    const tokenProvider = new Chatkit.TokenProvider({
      url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/9928246a-b97e-4ddf-8d70-3e9d2f36bf54/token'
    });

    const chatManager = new ChatManager({
      instanceLocator: 'v1:us1:9928246a-b97e-4ddf-8d70-3e9d2f36bf54',
      userId: 'diana',
      tokenProvider: tokenProvider
    })

    chatManager.connect()
      .then(currentUser => {
        this.currentUser = currentUser;
        this.setState({
          rooms: [...this.state.rooms , ...currentUser.rooms.map(function(room){
            return (
              {
                id: room.id,
                name: room.name
              }
            )
          })]
        })
        // console.log('Successful connection', currentUser)
      })
      .catch(err => {
        console.log('Error on connection', err)
      })

  }

  sendMessage = (text) =>{
    this.currentUser.sendSimpleMessage({
      roomId: this.state.currentRoomId,
      text: text,
    })
    .then(messageId => {
      console.log(`Added ${text}`)
    })
    .catch(err => {
      console.log(`Error adding message `)
    })
  }

  // loadRooms = () =>{
  //   this.setState({
  //     rooms: [...[] , this.currentUser.rooms.map(function(room){
  //       return (
  //         {
  //           id: room.id,
  //           name: room.name
  //         }
  //       )
  //     })]
  //   })
  // }

  subscribeToRoom = (roomId) =>{
    this.setState({
      currentRoomId: roomId
    })
    this.setState({
      messages: []
    })
    this.currentUser.subscribeToRoomMultipart({
      roomId: roomId,
      hooks: {
        onMessage: message => {
          // console.log("received message", message);
          this.setState({
            messages: [...this.state.messages , { id: message.id , text: message.parts[0].payload.content }]
          })
        }
      }
    })
  }

  addRoom = (roomName) =>{
    this.currentUser.createRoom({
      name: roomName,
    }).then(room => {
      console.log(`Created room called ${roomName}`)
      this.setState({
        rooms: [...this.state.rooms , { id: room.id , name: room.name}]
      })
    })
    .catch(err => {
      console.log(`Error creating room`)
    })
  }

  render(){
    return (
      <div className="App">
        <div className="row">
          <div className="col s3">
            <ShowRooms rooms={this.state.rooms} subscribeToRoom={this.subscribeToRoom}/>
            <AddRoom addRoom={this.addRoom}/>
          </div>
          <div className="col s9 card-panel">
            <div className="right-align"><ShowMessages messages={this.state.messages}/></div>
            <AddMessage sendMessage={this.sendMessage}/>
          </div>
          
        </div>
      </div>
    );
  }
}

export default App;

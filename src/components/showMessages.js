import React from "react";

class ShowMessages extends React.Component{
    
    render(){
        const messages = this.props.messages.map(function(message){
            return(
                <div key={message.id} className="card-panel teal right-align">
                    <span className="white-text">{message.text}</span>
                </div>
            )
        })
        return(
            <div className="container right-align right">
                {messages}
            </div>
        )
    }
}

export default ShowMessages;
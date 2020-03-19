import React from "react";

class ShowMessages extends React.Component{
    
    render(){
        const messages = this.props.messages.map(function(message){
            return(
                <div key={message.id}>
                    {message.text}
                </div>
            )
        })
        return(
            <div className="container">
                {messages}
            </div>
        )
    }
}

export default ShowMessages;
import React from "react";

class ShowRooms extends React.Component{
    render(){
        var rooms;
        // console.log(this.props.rooms)
        const subscribeToRoom = this.props.subscribeToRoom;
        if(this.props.rooms.length)
        {
            rooms = this.props.rooms.map(function(room){
                return(
                    <div key={room.id} onClick={()=>{subscribeToRoom(room.id)}}>
                            {room.name}
                    </div>
                )
            })
        }
        else{
            rooms = (
                <div key={1}></div>
            )
        }
        return(
            <div>
                    {rooms}
            </div>
        )
    }
}

export default ShowRooms;
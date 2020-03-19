import React from "react";

class AddRoom extends React.Component{
    state = {
        name: ""
    }

    handleChange = (e) =>{
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        this.props.addRoom(this.state.name);
        this.setState({
            name: ""
        })
    }

    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <input id="name" value={this.state.name} onChange={this.handleChange}>
                        </input>
                    </div>
                    <div>
                        <button>Add</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default AddRoom;
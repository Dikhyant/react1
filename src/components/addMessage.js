import React from "react";

class AddMessage extends React.Component{
    render(){
        return(
            <div>
                <form>
                    <div>
                        <textarea></textarea>
                    </div>
                    <div>
                        <button>Send</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default AddMessage;
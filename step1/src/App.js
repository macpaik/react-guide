import React, { Component } from 'react';
import UserInput from './User/UserInput.js';
import UserOutput from './User/UserOutput.js';
import './App.css';

class App extends Component {
    state = {
        users: [
            {username: "Paik"},
            {username: "Max"}
        ]
    }

    changeNameHandler = (e) => {
        this.setState({
            users: [
                {username: e.target.value},
                {username: "switchedMax"}
            ]
        });
    }

    render() {
        return (
            <div className="App">
                <h1>Step1</h1>
                <UserInput username={this.state.users[0].username} changed={this.changeNameHandler} />
                <UserOutput username={this.state.users[0].username} />
                <UserOutput username={this.state.users[1].username} />
            </div>
        )
    }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import ValidationComponent from './ValidationComponent/ValidationComponent.js';
import CharComponent from './CharComponent/CharComponent.js';

class App extends Component {

    state = {
        text: ''
    }

    textChangedHandler = (e) => {
        this.setState({
            text: e.target.value,
        });
    }

    deleteCharHandler = (charIndex) => {
        const texts = [...this.state.text.split('')];
        texts.splice(charIndex, 1);
        const updatedText = texts.join('');
        this.setState({
            text: updatedText
        });
    }

  render() {
        const textArr = (
            <div>
                {this.state.text.split('').map((char, index) => {
                    return <CharComponent
                        key={index}
                        char={char}
                        click={() => this.deleteCharHandler(index)} />
                })}
            </div>
        );

    return (
        <div className="App">
          <input onChange={this.textChangedHandler} type="text" value={this.state.text} />
          <p>{this.state.text}</p>
          <ValidationComponent length={this.state.text.length} />
            {textArr}
        </div>
    );
  }
}

export default App;

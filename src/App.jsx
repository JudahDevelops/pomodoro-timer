import { Component, useState } from 'react'
import './App.css'
import React,{ component } from 'react'

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Pomodoro />
      </div>
    )
  }
}

class Pomodoro extends Component {
  constructor(props) {
    super(props)
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      isOn: true
    }
    this.handleStartStop = this.handleStartStop.bind(this);
  }

  handleBreakChange = (event) => {
    this.setState({
      breakLength: event.target.value
    })
  }

  handleSessionChange = (event) => {
    this.setState({
      sessionLength: event.target.value
    })
  }

  handleStartStop = () => {
    this.setState({
      isOn: !this.state.isOn
    });
    document.getElementById('start_stop').innerText = this.state.isOn ? 'Stop' : 'Start';
  }


  render() {
    let seconds = this.state.sessionLength * 60;
    

   const updateTime = () => {
      let minutes = Math.floor(seconds / 60);
      document.getElementById('countdown').innerHTML = `${minutes}:${seconds % 60 < 10 ? '0' + seconds % 60 : seconds % 60}`;
      seconds--;
   } 

   isOn ? clearInterval(updateTime) : setInterval(updateTime, 1000);




  






    //if ison is true
      //setInterval(updateTime, 1000)
    //else
      //clearInterval(updateTime)
    //if reset is pressed
      //set seconds to sessionLength * 60
      //set session length to 25
      //set break length to 5



    return (
      <div>
        <h1>Pomodoro Timer</h1>
        <div id='lengths'>
          <div id='break'>
            <h2><label for="break">Break Length</label></h2>
            <input type="number" id="break" name="break" min="1" max="100" step="1" value={this.state.breakLength} onChange={this.handleBreakChange}></input>
          </div>
          <div id='session'>
            <h2><label for="session">Session Length</label></h2>
            <input type="number" id="session" name="session" min="1" max="100" step="1" value={this.state.sessionLength} onChange={this.handleSessionChange}></input>
          </div>
        </div>
        <div id='timer'>
          <h2 id='timer-label'>Session</h2>
          <h2 id='countdown'></h2>
          <div id='controls'>
            <button id='start_stop' onClick={this.handleStartStop}>Stop</button>
            <button id='reset'>Reset</button>
          </div>
        </div>
      </div>
    )
  }
}

export default App

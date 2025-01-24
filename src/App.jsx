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
      sessionLength: 25,
      breakLength: 5,
      isOn: false,
      type: 'Session'
    }
  }

  handleLengthChange = (e) => {
    const id = e.target.id
    const sessionLength = this.state.sessionLength
    const breakLength = this.state.breakLength
    if (id === 'break-decrement' && breakLength > 1) {
      this.setState({ breakLength: breakLength - 1 })
    } else if (id === 'break-increment' && breakLength < 60) {
      this.setState({ breakLength: breakLength + 1 })
    } else if (id === 'session-decrement' && sessionLength > 1) {
      this.setState({ sessionLength: sessionLength - 1 })
    } else if (id === 'session-increment' && sessionLength < 60) {
      this.setState({ sessionLength: sessionLength + 1 })
    }
  }

  handleStartStop = () => {
    this.setState({ isOn: !this.state.isOn })
  }

render() {
  //TODO
  //Implement the start stop functionality that doesn't just restart the timer
  //implement the reset functionality that changes type to session and resets the timer
  //implement the audio alert when the timer reaches 0
  const mins = document.getElementById('minutes');
  const secs = document.getElementById('seconds');

  let seconds;
  if (this.state.type === 'Session') {
    seconds = this.state.sessionLength * 60;
  } else if (this.state.type === 'Break') {
    seconds = this.state.breakLength * 60;
  }

  const updateTimer = () => {
    if (this.state.isOn) {
      if (seconds < 0) {
        if (this.state.type === 'Session') {
          this.setState({ type: 'Break' });
          seconds = this.state.breakLength * 60;
        } else if (this.state.type === 'Break') {
          this.setState({ type: 'Session' });
          seconds = this.state.sessionLength * 60;
        }
      }
      seconds --;
      let currentSecs = seconds % 60;
      let minutes = Math.floor(seconds / 60);
      mins.innerText = `${minutes}`;
      secs.innerText = `${currentSecs < 10 ? '0' + currentSecs : currentSecs}`;
    }
  }

  setInterval(updateTimer, 1000);

  return (
      <div>
        <h1>Pomodoro Timer</h1>
        <div id='lengths'>
          <div class='length-cont'>
            <h3>Break Length</h3>
            <div class='change-cont'>
              <button id='break-decrement' className='changeBtn' onClick={this.handleLengthChange}>-</button>
              <span id='break-length'>{this.state.breakLength}</span>
              <button id='break-increment' className='changeBtn' onClick={this.handleLengthChange}>+</button>
            </div>
          </div>
          <div class='length-cont'>
            <h3>Session Length</h3>
            <div class='change-cont'>
              <button id='session-decrement' className='changeBtn' onClick={this.handleLengthChange}>-</button>
              <span id='session-length'>{this.state.sessionLength}</span>
              <button id='session-increment' className='changeBtn' onClick={this.handleLengthChange}>+</button>
            </div>
          </div>
        </div>
        <div id='timer'>
          <h2>{this.state.type}</h2>
          <span id='time-left'><span id='minutes'>{this.state.sessionLength}</span>:<span id='seconds'>00</span></span>
        </div>
        <div id='controls'>
          <button id='start_stop' class='ctrlBtn' onClick={this.handleStartStop}>Start/Stop</button>
          <button id='reset' class='ctrlBtn'>Reset</button>
        </div>
      </div>
    )
  }
}

export default App

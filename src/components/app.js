import React, { Component } from 'react';
import Photos from './photos'

export default class App extends Component {
  render() {
    return (
      <div className='app'>
        <h1>DevCamp React Starter</h1>
        <h2>React Redux Router</h2>
        <Photos />
      </div>
    );
  }
}

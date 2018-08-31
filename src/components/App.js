import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import Dashboard from './dashboard'

class App extends Component {
  render () {
    return <Dashboard />
  }
}
export default hot(module)(App)

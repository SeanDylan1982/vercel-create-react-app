import React, { Component } from 'react'
// import App from 'base-shell/lib'
import _config from './config'
import LandingPage from './pages/LandingPage/LandingPage'

export default class Demo extends Component {
  render() {
    return <LandingPage config={_config} />
  }
}

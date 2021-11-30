import React, {Component} from 'react';
import './App.css';
import Auth from './components/Auth/Auth';
import { BrowserRouter as Router, Route } from "react-router-dom";

type AuthToken = {
  admin: boolean
  sessionToken: string | undefined
}

export default class App extends Component<{}, AuthToken> {
  constructor(props: AuthToken) {
    super(props)
    this.state = {
      sessionToken: undefined,
      admin: false
    }
  }

  const updateLocalStorage = (newToken) => {
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
  };

  const clearLocalStorage = () =>{
    localStorage.clear();
    setSessionToken(undefined)
  }

  const viewConductor = () => {
    return sessionToken !== undefined ?
    null :
    <Auth updateLocalStorage />
  }

  render(){
    return(
      <div>
        <Router>
          {this.viewConductor()}
        </Router>
      </div>
    )
  }
}
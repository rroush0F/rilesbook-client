import React, {Component} from 'react';
import './App.css';
import Auth from './components/Auth/Auth';
import NavBarRB from './site/Navbar';
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

  updateLocalStorage = (newToken: string) => {
    localStorage.setItem('token', newToken);
    this.setState({
      sessionToken: newToken
    })
  };

  clearLocalStorage = () =>{
    localStorage.clear();
      this.setState({
        sessionToken: undefined
      })
  }

  viewConductor = () => {
    return this.state.sessionToken !== undefined ?
    <NavBarRB admin={this.state.admin} sessionToken={this.state.sessionToken} clearLocalStorage={this.clearLocalStorage} /> :
    <Auth updateLocalStorage={this.updateLocalStorage} clearLocalStorage={this.clearLocalStorage}/>
  }

  render(){
    return(
      <div>
          {this.viewConductor()}   
      </div>
    )
  }
}
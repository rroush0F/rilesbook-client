import React from 'react';
import {Collapse, Button, Navbar, NavbarToggler, NavbarBrand, NavLink, Nav, NavItem } from "reactstrap";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import GetAllPosts from "../components/Timeline/GetAllPosts";
import Rblogo from '../assets/RilesBookLogo.png'
import Radium from 'radium';
import Posts from '../components/Profile/Posts';


type AuthFields = {
    sessionToken: string 
    clearLocalStorage: () => void
    admin: boolean
}


type NavOpen = {
    isOpen: boolean
}

export default class NavBarRB extends React.Component<AuthFields, NavOpen> {
    constructor(props: AuthFields) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    toggleOff() {
        this.setState({
            isOpen: false
        })
    }
    render() {
        return(
            <div>
                <Router>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">RilesBook</NavbarBrand>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <Nav>
                                     <Link to="/timeline">Timeline</Link>
                                </Nav>
                            </NavItem>
                            <NavItem>
                                <Nav> 
                                     <Link to="/myposts">My Profile</Link>
                                </Nav>
                            </NavItem>
                            {/* <NavItem>
                                <NavLink href="/admin">Restricted Access</NavLink>
                            </NavItem> */}
                            <Nav>
                                <Link to="/" onClick={this.props.clearLocalStorage}><Button className="btn btn-outline-danger">Sign Out</Button></Link>
                            </Nav>
                        </Nav>
                    </Collapse>
                </Navbar>
                <Routes>
                        <Route path="/timeline" element={<GetAllPosts sessionToken={this.props.sessionToken} />}/>
                         <Route path="/myposts" element={<Posts sessionToken={this.props.sessionToken} />}/>
                        {/* <Route path="/admin" element={<Admin />}/> */}
                </Routes>
                </Router>
            </div>
        )
    }
}

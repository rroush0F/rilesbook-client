import React from 'react';
import {Collapse, Button, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from "reactstrap";

type AuthFields = {
    sessionToken: string | undefined
    clearLocalStorage: () => void
}

export default class NavBarRB extends React.Component<AuthFields> {
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
                <Navbar color="light" light expand="md">
                    
                </Navbar>
            </div>
        )
    }
}
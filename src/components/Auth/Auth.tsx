import React, {Component} from "react";
import Display from './Display'

type AuthFields = {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    location: string,
    admin: boolean,
    login: boolean
};

type Props = {
    updateToken: (token: string) => void
    updateLocalStorage: () => void
}

export default class Auth extends Component <Props, AuthFields> {
    constuctor(props: AuthFields) {
        super(props)
        this.state = {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            location: "",
            admin: false,
            login: true
        }
    }
    
    loginToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        this.setState({
            login: !this.state.login,
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            location: ""
        })
    }

    const logsignbut = () => {
        return !this.state.login ? 'Go Back To Sign In' : 'Sign Up'
    }
    
    const logRegLabel = () => {
        return !this.state.login ? 'Register A New User' : 'Sign In'
    }
    
    const submitBut = () => {
        return !this.state.login ? 'Create User' : 'Login'
    }


    signupFields = () => !this.state.login ?
    (
        <div>
            <label htmlFor="email">Email:</label>
            <br/>
            <input required type='email' id="email" placeholder="Ex: rroush@gmail.com" value={this.state.email} onChange={(e) => this.setState({email: (e.target.value)})} />
            <br/>
            <label htmlFor="password">Password:</label>
            <br/>
            <input required type='password' id="password" placeholder="DO NOT SHARE" value={this.state.password} onChange={(e) => this.setState({password: (e.target.value)})} />
            <br/>
            <label htmlFor="firstName"><strong>First Name:</strong></label>
            <br/>
            <input required type='text' id="firstName" placeholder="Your First Name" value={this.state.firstName} onChange={(e) => this.setState({firstName: (e.target.value)})} />
            <br/>
            <label htmlFor="lastName"><strong>Last Name:</strong></label>
            <br/>
            <input required type='text' id="lastName" placeholder="Your Last Name" value={this.state.lastName} onChange={(e) => this.setState({lastName: (e.target.value)})} />
            <br/>
            <label htmlFor="location"><strong>Location:</strong></label>
            <br/>
            <input required type='text' id="location" placeholder="City or State" value={this.state.location} onChange={(e) => this.setState({location: (e.target.value)})} />
        </div>
    ) : (
        <div>

        </div>
    )

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let reqBody = this.state.login ?
        {
            user: {
                email: this.state.email,
                password: this.state.password
            }
        } :
        {
            user: {
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                location: this.state.location,
                admin: this.state.admin
            }
        }

        let url = this.state.login ?
        `http://localhost:3000/user/login` :
        `http://localhost:3000/user/register`;

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: new Headers({
                'Content-Type' : 'application/json'
            })
        })
        .then(response => response.json())
    }

    render() {
        return(
            <div>
                <Display
                    email={this.state.email}
                    password={this.state.password}
                    firstName={this.state.firstName}
                    lastName={this.state.lastName}
                    login={this.state.login}
                    handleSubmit={this.handleSubmit}
                    logRegLabel={this.logRegLabel}
                    submitBut={this.submitBut}
                />
            </div>
        )
    }
}

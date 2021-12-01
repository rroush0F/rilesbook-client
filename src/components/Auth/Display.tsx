import React from 'react';
import {Button} from "reactstrap"
import Radium from 'radium'
import RBlogo from '../../assets/RilesBookLogo.png'

type AuthFields = {
    email: string
    password: string
    firstName: string
    lastName: string
    location: string
    login: boolean
    loginToggle: (e: React.MouseEvent<HTMLButtonElement>) => void
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    logsignbut: () => string
    logRegLabel: () => string
    submitBut: () => void
    signupFields: () => void
}

const styles = {
    
    loginPage: {
        backgroundColor: "lightblue",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100vh",
    },

    login: { 
        backgroundSize: "cover",
        backgroundColor: "rgba(231, 231, 219, 0.8)",
        margin: "auto",
        width: "50%",
        border: "3px solid black",
        borderRadius: "12px",
        padding: "20px",
        paddingTop: "500px",
        top: "50%",
        transform: "translate(0, -50%)"
    },

    hr1: {
        width: "50%",
        marginLeft: "25%"
    },

    hr2: {
        width: "50%",
        marginLeft: "25%"
    },

}

const Display = (props: AuthFields) => {

    return (
        <div style={styles.loginPage} id="loginPage">
            <div style={styles.login} className="loginPage">
                <form id="login" onSubmit={props.handleSubmit}>
                    <img src={RBlogo} alt="RBlogoauth" id="rblogo"/>
                    <hr style={styles.hr1} />
                    <h1> {props.logRegLabel()}</h1>
                    <hr style={styles.hr2} />
                    {props.signupFields()}
                    <br/>
                    <Button type="submit" className="btn-lg btn-dark btn-block">{props.submitBut()} </Button>
                    <br/>
                    <br/>
                    <Button className="btn-lg btn-danger btn-block" onClick={props.loginToggle}>{props.logsignbut()}</Button>
                </form>
            </div>
        </div>
    )
    
}

export default Radium(Display);
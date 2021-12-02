import React, { Component } from "react"
import { Form, ModalHeader, Button, Input, Modal, ModalBody } from 'reactstrap';
import getAllPosts from  './GetAllPosts'
import APIURL from '../../helpers/environment'

type AuthFields = {
    sessionToken: string
    getAllPosts: () => void
}

type PostFields = {
    body: string,
    likes: number
}

export default class CreatePost extends Component<AuthFields, PostFields> {
    constructor(props: AuthFields) {
        super(props)
        this.state= {
            body: "",
            likes: 0
        }
    }

    newPost = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetch(`${APIURL}/post/create`, {
            method: 'POST',
            body: JSON.stringify({
                post: {
                    body: this.state.body,
                    likes: this.state.likes
                }
            }),
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `${this.props.sessionToken}`
            })
        })
        .then(response => response.json())
        .then(json => {
            console.log(json)
            this.setState({
                body: "",
                likes: 0
            })
        this.props.getAllPosts()
        })
        .catch(err => console.log(err))
    }

    render() {
        return(
            <div>
                <Modal isOpen={true}>
                    <ModalHeader id="submitHeader">What's On Your Mind?</ModalHeader>
                    <ModalBody>
                        <Form className="newPost" onSubmit={this.newPost}>
                            <Input required type='textarea' id="postBody" placeholder="Type Here" value={this.state.body} onChange={(e) => this.setState({body: (e.target.value)})} />
                            <Button id="submitPostBtn" className="btn-lg btn-dark btn-block" type='submit'>Post</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}
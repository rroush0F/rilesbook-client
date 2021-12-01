import React, { Component } from "react";
import { Form, ModalHeader, Button, Input, Modal, ModalBody } from 'reactstrap';

type AuthFields = {
    sessionToken: string
}

type CommentFields = {
    body: string
    likes: number
}

export default class CreateComment extends Component<AuthFields, CommentFields> {
    constructor(props: AuthFields) {
        super(props)
        this.state = {
            body: "",
            likes: 0
        }
    }

    createComment = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetch(`http://localhost:3000/comment/create/`, {
            method: "POST",
            body: JSON.stringify({
                comment: {
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
        })
        .catch(err => console.log(err))
    }

    render(){
        return(
            <div>
                <Modal isOpen={true}>
                    <ModalBody>
                        <Form className="newPost" onSubmit={this.createComment}>
                            <Input required type='text' id="commentBody" placeholder="Respond" value={this.state.body} onChange={(e) => this.setState({body: (e.target.value)})} />
                            <Button id="submitPostBtn" className="btn-lg btn-dark btn-block" type='submit'>Comment</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}
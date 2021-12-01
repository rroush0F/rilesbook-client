import React, { Component } from "react";
import { Form, ModalHeader, Button, Input, Modal, ModalBody } from 'reactstrap';

type AuthFields = {
    sessionToken: string
    updateToken: (token: string) => void
    editedPost: PostFields
}

type PostFields = {
    body: string
    likes: number
    id: string
}

export default class UpdatePost extends Component<AuthFields, PostFields> {
    constructor(props: AuthFields) {
        super(props)
        this.state = {
            body: this.props.editedPost.body,
            likes: this.props.editedPost.likes,
            id: this.props.editedPost.id
    }
}

    editUpdatePost = (e: React.FormEvent<HTMLFormElement> ) => {
        console.log(this.props.editedPost)
        e.preventDefault();
        fetch(`http://localhost:3000/post/update/${this.props.editedPost.id}`, {
            method: "PUT",
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
    } 


    render() {
        return(
            <Modal isOpen={true}>
                <ModalHeader>Edit Your Post</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.editUpdatePost}>
                        <Input required type='textarea' id="postBody" placeholder="Type Here" value={this.state.body} onChange={(e) => this.setState({body: (e.target.value)})} />
                        <Button id="submitPostBtn" className="btn-lg btn-dark btn-block" type='submit'>Update Post</Button>
                        </Form>
                    </ModalBody>
            </Modal>
        )
    }
}
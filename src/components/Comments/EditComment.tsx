import React, { Component } from "react";
import { Form, ModalHeader, Button, Input, Modal, ModalBody } from 'reactstrap';

type AuthFields = {
    sessionToken: string
    updateToken: (token: string) => void
    editedComment: CommentFields
}

type CommentFields = {
    body: string,
    likes: number,
    id: string
}

export default class UpdateComment extends Component<AuthFields, CommentFields> {
    constructor(props: AuthFields) {
        super(props)
        this.state = {
            body: this.props.editedComment.body,
            likes: this.props.editedComment.likes,
            id: this.props.editedComment.id
        }
    }

    editComment = (e: React.FormEvent<HTMLFormElement> ) => {
        e.preventDefault();
        fetch(`http://localhost:3000/post/update/${this.props.editedComment.id}`, {
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
                <ModalHeader>Edit Your Comment</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.editComment}>
                        <Input required type='textarea' id="postBody" placeholder="Type Here" value={this.state.body} onChange={(e) => this.setState({body: (e.target.value)})} />
                        <Button id="submitPostBtn" className="btn-lg btn-dark btn-block" type='submit'>Update Comment</Button>
                        </Form>
                    </ModalBody>
            </Modal>
        )
    }
}
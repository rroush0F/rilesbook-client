import React, { Component } from "react";
import { Card, CardBody, Col, Container, Form, Input, Row } from 'reactstrap';

type AuthFields = {
    sessionToken: string
    updateToken: (token: string) => void
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
                <Container>
                    <Row>
                        <Col>
                            <Card>
                                <CardBody>
                                    <Form onSubmit={this.createComment}>
                                        <div className="commentCreate">
                                            <Input required type='textarea' id="postBody" placeholder="Type Here" value={this.state.body} onChange={(e) => this.setState({body: (e.target.value)})} />
                                        </div>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
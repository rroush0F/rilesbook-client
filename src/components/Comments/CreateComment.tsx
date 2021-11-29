import React, { Component } from "react";

type AuthFields = {

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
        fetch(`http://localhost:3000/comment/create/${postId}`, {
            method: "POST",
            body: JSON.stringify({
                comment: {
                    body: this.state.body,
                    likes: this.state.likes
                }
            }),
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `this.sessionToken`
            })
        })
        .then(response => response.json())
    }
}
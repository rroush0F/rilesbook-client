import React, { Component } from "react";

type AuthFields = {

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

        }
    }


    editPost = (e: React.FormEvent<HTMLFormElement> ) => {
        e.preventDefault();
        fetch(`http://localhost:3000/post/update/`, {
            method: "PUT",
            body: JSON.stringify({
                post: {
                    body: this.state.body,
                    likes: this.state.likes
                }
            }),
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": ``
            })
        })
        .then(response => response.json())
    }

    render() {
        return(
            
        )
    }
}
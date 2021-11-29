import React, { Component } from "react"

type AuthFields = {

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
        fetch(`http://localhost:3000/post/create`, {
            method: 'POST',
            body: JSON.stringify({
                post: {
                    body: this.state.body,
                    likes: this.state.likes
                }
            }),
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `props.sessionToken`
            })
        })
        .then(response => response.json())
    }

    render() {
        return(
            <div>
                <h1>Create a new Post</h1>
                <p>What's on your mind?</p>
            </div>
        )
    }
}
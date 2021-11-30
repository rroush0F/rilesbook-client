import React, { Component } from "react"
import CreatePost from "./CreatePost"
import UpdatePost from "./EditPost"
import DisplayPosts from "./DisplayPosts"

type AuthFields = {
    sessionToken: string
}

type PostFields = {
    body: string
    likes: number
    id: string
    posts: []
}

export default class Posts extends Component<AuthFields, PostFields> {
    constructor(props: AuthFields){
        super(props)
        this.state = {
            posts: [],
            body: "",
            likes: 0,
            id: ""
    }
}

    getAllPosts = () => {
        fetch(`http://localhost:3000/post/myposts`, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `${this.props.sessionToken}`
            })
        })
        .then(response => response.json())
        .then(json => {
            console.log(json)
            this.setState({
                posts: json
            })
        })
        .catch(error => console.log(error))
    }

    deleteMyPost = () => {
        fetch(`http://localhost:3000/post/delete/`, {
            method: "DELETE",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `${this.props.sessionToken}`
            })
        })
        .then(response => response.json())
        .then(json => {
            console.log(json)
        })
        .catch (error => console.log(error))
    }
}

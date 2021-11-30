import React, { Component } from "react"
import CreateComment from "./CreateComment"
import EditComment from "./EditComment"

type AuthFields = {
    sessionToken: string
}

type PostFields = {
    body: string
    likes: number
    id: string
    comments: []
}

export default class Posts extends Component<AuthFields, PostFields> {
    constructor(props: AuthFields){
        super(props)
        this.state = {
            comments: [],
            body: "",
            likes: 0,
            id: ''
        }
    }

    getAllComments = () => {
        fetch(`http://localhost:3000/comment/all/${postId}`, {
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
                comments: json
            })
        })
        .catch(error => console.log(error))
    }

    deleteAComment = () => {
        fetch(`http://localhost:3000/comment/delete/${commentId}`, {
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
        .catch(error => console.log(error))
    }
}
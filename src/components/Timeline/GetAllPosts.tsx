import React, { Component } from "react"
import APIURL from "../../helpers/environment"
import Posts from "../Profile/Posts"
import CreatePost from "./CreatePost"
import DisplayTimeline from "./DisplayTimeline"

type AuthFields = {
    sessionToken: string
}

type PostFields = {
    body: string
    likes: number
    id: string
    posts: []
}

export default class GetAllPosts extends Component<AuthFields, PostFields> {
    constructor(props: AuthFields){
        super(props)
        this.state = {
            posts: [],
            body: "",
            likes: 0,
            id: ""
        }
    }
    componentDidMount() {
        this.getAllPosts()
    }
    getAllPosts = () => {
        fetch(`${APIURL}/post/timeline`, {
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
            console.log(this.state.posts)
        })
        .catch(error => console.log(error))
    }
    render(){
        return(
            <div>
                <DisplayTimeline posts={this.state.posts} sessionToken={this.props.sessionToken} getAllPosts={this.getAllPosts}/>
            </div>
        )
    }
}
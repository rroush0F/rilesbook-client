import { throws } from "assert"
import React, { Component } from "react"
import DisplayProfile from "./DisplayProfile"
import UpdatePost from "./EditPost"

type AuthFields = {
    sessionToken: string
}

type PostState = {
    posts: PostFields[]
    createActive: boolean
    updateActive: boolean
    updatedPost: PostFields
}

type PostFields = {
    body: string
    likes: number
    id: string
}

export default class Posts extends Component<AuthFields, PostState> {
    constructor(props: AuthFields){
        super(props)
        this.state = {
            posts: [],
            createActive: false,
            updateActive: false,
            updatedPost: {
                body: "",
                likes: 0,
                id: ""
            }
    }
}


componentDidMount = () => {
    this.getMyPosts();
}

createOn = () => {
    this.setState({createActive: true})
}

editUpdatePosts = (postFields: PostFields) => {
    this.setState({updatedPost: postFields})
}

createOff = () => {
    this.setState({createActive: false})
}

updateOn = () => {
    this.setState({updateActive: true})
}

updateOff = () => {
    this.setState({updateActive: false})
}



getMyPosts = () => {
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

    deleteMyPost = (id: string) => {
        fetch(`http://localhost:3000/post/delete/${id}`, {
            method: "DELETE",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `${this.props.sessionToken}`
            })
        })
        .then(response => response.json())
        .then(json => {
            console.log(json)
            this.getMyPosts()
        })
        .catch (error => console.log(error))
    }
    
    render(){
        return(
            <div>
                <DisplayProfile posts={this.state.posts} createOn={this.createOn} updateOn={this.updateOn} editUpdatePost={this.editUpdatePosts} deleteMyPost={this.deleteMyPost}/>
                {this.state.updateActive ?<UpdatePost sessionToken={this.props.sessionToken} editedPost={this.state.updatedPost} updateOff={this.updateOff} getMyPosts={this.getMyPosts}/> : null}
            </div>
        )
    }

}

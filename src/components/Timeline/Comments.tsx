import React, { Component } from "react"
import CreateComment from "./CreateComment"
import DisplayTimeline from "../Timeline/DisplayTimeline"
import EditComment from "./EditComment"
import {Card, CardBody, CardSubtitle, CardText, Button} from 'reactstrap'
import APIURL from '../../helpers/environment'

type AuthFields = {
    sessionToken: string
    postId: any
}

type CommentState = {
    posts: CommentFields[]
    comments: any
    createActive: boolean
    updateActive: boolean
    updatedComment: CommentFields
}

type CommentFields = {
    body: string
    likes: number
    id: string
}

export default class Comments extends Component<AuthFields, CommentState> {
    constructor(props: AuthFields){
        super(props)
        this.state = {
            comments: [],
            posts: [],
            createActive: false,
            updateActive: false,
            updatedComment: {
                body: "",
                likes: 0,
                id: ''
            }
        }
    }

    componentDidMount = () => {
        this.getAllComments();
    }
    
    createOn = () => {
        this.setState({createActive: true})
    }
    
    editUpdatePosts = (commentFields: CommentFields) => {
        this.setState({updatedComment: commentFields})
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

    getAllComments = () => {
        fetch(`${APIURL}/comment/all/${this.props.postId}`, {
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
            console.log(this.state.comments, "12423542")
        })
        .catch(error => console.log(error))
    }

    deleteAComment = () => {
        fetch(`${APIURL}/comment/delete/${this.state.comments.id}`, {
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

    render(){
        return(
            <div>
                {this.state.comments.map((comment: any, key: any) => {
            console.log(comment.id)
                return(
                    <Card key={key}>
                        <CardBody className="commentBody">
                            <CardText className="commentText">{comment.body}</CardText>
                            <CardText className="commentText">Likes: {comment.likes}</CardText>
                            <button>Like👍</button>
                        </CardBody>
                    </Card>
                )
            })}
            </div>
        )
    }
}
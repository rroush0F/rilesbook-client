import React from "react";
import Comments from "./Comments";
import CreateComment from "./CreateComment";
import {Card, CardBody, CardSubtitle, CardText, Button} from 'reactstrap'
import { userInfo } from "os";
import CreatePost from "./CreatePost";

type TimelineProps = {
    posts: PostFields[]
    // comments: CommentFields[]
    sessionToken: string
}

// type CommentFields = {
//     body: string
//     likes: string
//     id: string
// }

type PostFields = {
    body: string
    likes: number
    id: string
}

const DisplayTimeline = (props: TimelineProps) => {
    
    return(
        <>
            <CreatePost sessionToken={props.sessionToken}/>
        <div>
            <h2 className="myPostHeader">The Timeline:</h2>
            {props.posts.map((post, key) => {
            console.log(post.id)
                return(
                    <Card key={key}>
                        <CardBody>
                            {/* <h5>{props.user.firstName}{props.user.lastName}</h5> */}
                            <CardText>{post.body}</CardText>
                            <CardText>Likes: {post.likes}</CardText>
                            <Comments postId={post.id} sessionToken={props.sessionToken}/>
                            <CreateComment sessionToken={props.sessionToken}/> 
                            {/* <Button className="btn btn-warning editBtn" type="button" onClick={() => {props.editUpdateComment(char); props.updateOn()}}>Edit Character</Button>
                            <Button className="btn btn-danger deleteBtn" type="button" onClick={() => {deleteComment(char.id)}}>Delete Character</Button> */}
                        </CardBody>
                    </Card>
                )
            })}
        </div>
        </>
    )
}


export default DisplayTimeline
import React from "react";
import Comments from "./Comments";
import CreateComment from "./CreateComment";
import {Card, CardBody, CardSubtitle, CardText, Button} from 'reactstrap'
import { userInfo } from "os";
import Radium from "radium";
import CreatePost from "./CreatePost";


type TimelineProps = {
    posts: PostFields[]
    sessionToken: string
    getAllPosts: () => void
}


type PostFields = {
    body: string
    likes: number
    id: string
}

const styles = {

    timelinePage: {
        backgroundColor: "lightblue",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
    }

}


const DisplayTimeline = (props: TimelineProps) => {
    
    return(
        <>
            <CreatePost sessionToken={props.sessionToken} getAllPosts={props.getAllPosts}/>
        <div style={styles.timelinePage} id="loginPage">
            <h2 className="myPostHeader">The Timeline:</h2>
            {props.posts.map((post, key) => {
            console.log(post.id)
                return(
                    <Card key={key}>
                        <CardBody className="postBody">
                            {/* <h5>{props.user.firstName}{props.user.lastName}</h5> */}
                            <CardText><strong>{post.body}</strong></CardText>
                            <CardText>Likes: {post.likes}</CardText>
                            <button>Like👍</button>
                            <CreateComment sessionToken={props.sessionToken}/> 
                            <hr />
                            <p>Comments:</p>
                            <Comments postId={post.id} sessionToken={props.sessionToken}/>
                        </CardBody>
                    </Card>
                )
            })}
        </div>
        </>
    )
}


export default DisplayTimeline
import React from "react";
import {Card, CardBody, CardText, Button} from 'reactstrap'
import Radium from "radium";


type ProfileProps = {
    posts: PostFields[]
    createOn: () => void
    updateOn: () => void
    editUpdatePost: (id: PostFields) => void 
    deleteMyPost: (postid: string) => void
}

type PostFields = {
    body: string
    likes: number
    id: string
}

const styles = {

    profilePage: {
        backgroundColor: "lightblue"
    }

}

const DisplayProfile = (props: ProfileProps) => {

    return(
        <div style={styles.profilePage}>
            <br/>
            <h2 className="myPostHeader">My Posts:</h2>
            {props.posts.map((post, key) => {
                return(
                    <Card key={key}>
                        <CardBody>
                            <CardText>{post.body}</CardText>
                            <Button className="editBtn" type="button" onClick={() => {props.editUpdatePost(post); props.updateOn()}}>Edit Post✂️</Button>
                            <br />
                            <br />
                            <Button className="deleteBtn" type="button" onClick={() => {props.deleteMyPost(post.id)}}>Delete Post🛑</Button>
                            <br />
                        </CardBody>
                    </Card>
                )
            })}
            <br/>
            <br/>
        </div>
    )
}

export default DisplayProfile
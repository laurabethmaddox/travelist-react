import React, { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { deletePost, getPostById } from "../PostManager";
import "./PostDetails.css"
import { useHistory } from "react-router-dom";

export const PostDetail = () => {
    const { postId } = useParams()
    const [post, setPost] = useState({categories: []})
    const history = useHistory()

    useEffect(() => {
        getPostById(postId).then(postData => setPost(postData))
    }, [postId])

    const deleteSinglePost = () => {
        return deletePost(postId)
            .then(data => setPost(data))
    }

    return (
        <>
            <div className="banner">
                <img src={post.img} className="blog-image" alt="travels"/>
            </div>
            <div className="blog">
                <h1 className="title">{post.title}</h1>
                <div className="cat-and-title">
                    Travel Category: {post.categories?.map(category => {
                        return <div>{category.name}</div>
                    })}
                </div>
                <div className="article">{post.body}</div>
            </div>
            <div className="blog-options">
                <button className="btn dark publish-btn" onClick={() => {
                    history.push(`/posts/edit/${post.id}`)
                }}>Edit</button>
                <button className="btn grey delete-btn" onClick={(evt) => {
                    evt.preventDefault()
                    deleteSinglePost(post.id)}}>Delete</button>
            </div>
        </>
    )
}


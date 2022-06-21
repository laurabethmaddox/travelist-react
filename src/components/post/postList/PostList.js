import React, { useEffect, useState } from "react";
import { Header } from "../../header/Header";
import { getPosts } from "../PostManager";
import "./PostList.css"
import { Link } from "react-router-dom";

export const PostList = (props) => {
    const [ posts, setPosts ] = useState([])

    const getAllPosts = () => {
        return getPosts()
            .then((postData) => {
                setPosts(postData)
            })
    }

    useEffect(() => {
        getAllPosts()
    }, [])

    return (
        <>
            <Header />
            <article className="blog-section">
                {
                    posts.map(post => {
                        return <section key={`post--${post.id}`} className="blogs-section">
                            <div className="blog-card">
                                <img src={post.img} className="blog-image" alt="travels"/>
                                <h1 className="blog-title">{post.title}</h1>
                                <p className="blog-overview">{post.body.substring(0,200) + '...'}</p>
                                <Link to={`/posts/${post.id}`}>
                                    <button className="btn dark">Read</button>
                                </Link>
                            </div>
                        </section>
                    })
                }
            </article>
        </>
    )
}
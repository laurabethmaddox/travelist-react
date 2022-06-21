import React from "react"
import { Route } from "react-router-dom"
// import { Destinations } from "./destinations/Destinations.js"
import { PostDetail } from "./post/details/PostDetails"
import { EditPost } from "./post/editPost/EditPost"
import { PostForm } from "./post/form/PostForm"
import { PostList } from "./post/postList/PostList"

export const ApplicationViews = () => {
    return <>
        <main>
            <Route exact path="/">
                <PostList />
            </Route>

            <Route exact path="/posts">
                <PostList />
            </Route>

            <Route exact path="/posts/new">
                <PostForm />
            </Route>

            <Route exact path="/posts/edit/:postId(\d+)">
                <EditPost />
            </Route>

            <Route exact path="/posts/:postId(\d+)">
                <PostDetail />
            </Route>

            {/* <Route exact path="/destnations">
                <Destinations />
            </Route> */}
        </main>
    </>
}

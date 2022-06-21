import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { createPost, getCategories } from "../PostManager";
import "./PostForm.css"

export const PostForm = () => {
    const history = useHistory()
    const [categories, setCategories] = useState([])

    // Since the input fields are bound to the values of
    // the properties of this state variable, you need to
    // provide default values
    const [currentPost, setCurrentPost] = useState({
        traveler: 0,
        img: "",
        title: "",
        body: "",
        categories: []
    })

    useEffect(() => {
        getCategories()
            .then(data => setCategories(data))
    }, [])

    // Handles a change on any one of your inputs
    const changePostState = (evt) => {
        // Make a copy of all the posts
        let postCopy = Object.assign({}, currentPost)
        // Takes the copy and
        // At the moment it changes, it looks at the input and uses the string to change state
        postCopy[evt.target.name] = evt.target.value
        // Set state with the new post on it
        setCurrentPost(postCopy)
    }

    const checkedStateChange = (evt) => {
        let copy = {...currentPost}
        if (evt.target.checked) {
            copy.categories.push(parseInt(evt.target.value)) // If changed to checked, add the category
        } else {
            copy.categories.splice(copy.categories.indexOf(evt.target.value), 1) // If changed to unchecked, find the index of the id, and then remove one element starting at that index
        }
        setCurrentPost(copy)
    }

    const makePost = () => {
        if (categories === []) {
            window.alert("Please select a category")
        } else {
            // Send POST request to the API
            createPost({
                traveler: parseInt(localStorage.getItem("token")),
                img: currentPost.img,
                title: currentPost.title,
                body: currentPost.body,
                categories: currentPost.categories
            })
            .then(() => history.push("/posts"))
        }
    }

    return (
        <>
            <div className="blog">
                <textarea type="text" name="title" required autoFocus className="title"
                    value={currentPost.title}
                    onChange={changePostState}
                    placeholder="Location Visited">
                </textarea>
                <textarea type="url" name="img" required autoFocus className="url"
                    value={currentPost.img}
                    onChange={changePostState}
                    placeholder="Image URL">
                </textarea>
                <div className="cat-and-title">
                    <div className="title-1">What kind of trip was it? Select all that apply...</div>
                    <div className="categories">
                        {categories.map((category) => {
                            return (
                                <div className="category" key={`categories-${category.id}`}>
                                    <input
                                        type="checkbox"
                                        required
                                        className="checkbox"
                                        name="categories"
                                        value={category.id}
                                        onChange={checkedStateChange}
                                    />
                                    <label htmlFor="category" className="category">{category.name}</label>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <textarea type="text" name="body" required autoFocus className="article"
                    value={currentPost.body}
                    onChange={changePostState}
                    placeholder="Start writing here...">
                </textarea>
            </div>
            <div className="blog-options">
                <button type="submit"
                    onClick={evt => {
                        evt.preventDefault() // Prevent form from being submitted
                        makePost()
                    }}
                    className="btn dark publish-btn">publish</button>
            </div>
        </>
    )
}
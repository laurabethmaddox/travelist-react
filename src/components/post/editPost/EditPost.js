import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { getCategories, getPostById, updatePost } from "../PostManager";

export const EditPost = () => {
    const history = useHistory()
    const [categories, setCategories] = useState([])
    const { postId } = useParams()

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
    }, [postId])

    useEffect(() => {
        getPostById(postId)
            .then((data) => 
                setCurrentPost({
                    id: data.id,
                    traveler: parseInt(localStorage.getItem("token")),
                    img: data.img,
                    title: data.title,
                    body: data.body,
                    categories: data.categories.map((category) => {
                        return category.id
                    }),
                }))
    }, [])

    const updatePostState = (evt) => {
        evt.preventDefault()
        const postCopy = {...currentPost}
        let key = evt.target.name
        postCopy[key] = evt.target.value
        setCurrentPost(postCopy)
    }

    const checkedStateChange = (evt) => {
        const copy = {...currentPost}
        if (evt.target.checked) {
            copy.categories.push(parseInt(evt.target.value)) // If changed to checked, add the category
        } else {
            copy.categories.splice(copy.categories.indexOf(evt.target.value), 1) // If changed to unchecked, find the index of the if, and then remove one element starting at that index
        }
        setCurrentPost(copy)
    }

    return (
        <>
            <div className="blog">
                <textarea type="text" name="title" required autoFocus className="title"
                    value={currentPost.title}
                    onChange={updatePostState}
                    placeholder="Location Visited">
                </textarea>
                <textarea type="url" name="img" required autoFocus className="url"
                    value={currentPost.img}
                    onChange={updatePostState}
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
                                        checked={currentPost.categories.includes(category.id)}
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
                    onChange={updatePostState}
                    placeholder="Start writing here...">
                </textarea>
            </div>
            <div className="blog-options">
                <button type="submit"
                    onClick={evt => {
                        evt.preventDefault()
                        
                        const post = {
                            id: currentPost.id,
                            traveler: parseInt(localStorage.getItem("token")),
                            img: currentPost.img,
                            title: currentPost.title,
                            body: currentPost.body,
                            categories: currentPost.categories
                        }

                        updatePost(post, currentPost).then(() => history.push("/posts"))
                    }}
                    className="btn dark publish-btn">update</button>
            </div>
        </>
    )
}
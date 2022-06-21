export const getPosts = () => {
    return fetch("http://localhost:8000/posts", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(res => res.json())
}

export const getPostById = (id) => {
    return fetch(`http://localhost:8000/posts/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(res => res.json())
}

export const createPost = (post) => {
    return fetch("http://localhost:8000/posts", {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    })
        .then(getPosts)
}

export const updatePost = (post) => {
    return fetch(`http://localhost:8000/posts/${post.id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(post)
    })
}

export const deletePost = (postId) => {
    return fetch(`http://localhost:8000/posts/${postId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(getPosts)
}

export const getCategories = () => {
    return fetch("http://localhost:8000/categories", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        },
    }).then(res => res.json())
}
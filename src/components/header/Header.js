import React from "react";
import { useHistory } from "react-router-dom";
import "./Header.css"

export const Header = () => {
    const history = useHistory()

    return (
        <header className="header">
                <div className="content">
                    <h1 className="heading">
                        <span className="small">welcome to the world of</span>
                        blog
                        <span className="no-fill"> writing</span>
                    </h1>
                    <button className="btn"
                        onClick={() => {
                            history.push({ pathname: "/posts/new"})
                        }}
                    >Write a blog</button>
                </div>
            </header>
    )
}
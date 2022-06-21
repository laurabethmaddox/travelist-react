import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { Travelist } from "./components/Travelist"
import "./index.css"

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Travelist />
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
)

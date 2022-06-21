import React from "react"
import { Link, useHistory } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
  const history = useHistory()
  return (
    <nav className="navbar">
      <Link to="/#" className="link">Travelist</Link>
      <ul className="links-container">
        <li className="link-item">
          <Link to="/#" className="link">Home</Link>
        </li>
        <li className="link-item">
          {
            localStorage.getItem("auth_token") !== null ?
            <button className="logout" onClick={() => {
              localStorage.removeItem("auth_token")
              history.push({ pathname: "/" })
            }}>
                  Logout
                </button>
              :
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
          }
        </li>
      </ul>
    </nav>
  )
}

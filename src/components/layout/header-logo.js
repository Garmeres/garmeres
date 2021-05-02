import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"

const Logo = ({ image, text }) => {
  return (
    <div className="sidebar-logo-container">
      <Link to="/" aria-label="home">
        <div id="sidebar-logo-image-container">
          <Img className="sidebar-logo-image" fluid={image} />
        </div>
        <span id="sidebar-logo-text">{text}</span>
      </Link>
    </div>
  )
}

export default Logo

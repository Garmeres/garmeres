import React from "react"
import SbEditable from "storyblok-react"
import "../style/featured.css"

const Featured = ({ blok }) => {
  return (
    <SbEditable content={blok} key={blok._uid}>
      <div className="featured-container">FEATURED</div>
    </SbEditable>
  )
}

export default Featured

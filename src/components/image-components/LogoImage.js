import React from "react"
import SbEditable from "storyblok-react"
import Img from "gatsby-image"
import { getFluidGatsbyImage } from "gatsby-storyblok-image"

const FluidImage = ({ blok }) => {
  const image = getFluidGatsbyImage(blok.image.filename, {
    maxWidth: 380,
  })

  return (
    <SbEditable content={blok} key={blok._uid}>
      <div id="logo-container">
        {image != null ? (
          <Img className="logo-image" fluid={image} alt={blok.alt} />
        ) : null}
        <h1 id="logo-text">Garmeres</h1>
      </div>
    </SbEditable>
  )
}

export default FluidImage

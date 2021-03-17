import React from "react"
import SbEditable from "storyblok-react"
import Img from "gatsby-image"
import { getFluidGatsbyImage } from "gatsby-storyblok-image"

const FluidImage = ({ blok }) => {
  const image = getFluidGatsbyImage(blok.image.filename, {
    maxWidth: 900,
  })

  return (
    <SbEditable content={blok} key={blok._uid}>
      {image != null ? <Img fluid={image} alt={blok.alt} /> : null}
    </SbEditable>
  )
}

export default FluidImage

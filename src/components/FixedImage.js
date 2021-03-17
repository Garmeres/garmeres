import React from "react"
import SbEditable from "storyblok-react"
import Img from "gatsby-image"
import { getFixedGatsbyImage } from "gatsby-storyblok-image"

const FixedImage = ({ blok }) => {
  const image = getFixedGatsbyImage(blok.image.filename, {
    maxWidth: 900,
  })

  return (
    <SbEditable content={blok} key={blok._uid}>
      {image != null ? (
        <Img fixed={image} alt={blok.alt} />
      ) : null}
    </SbEditable>
  )
}

export default FixedImage

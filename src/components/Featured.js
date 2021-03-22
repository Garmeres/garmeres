import React from "react"
import SbEditable from "storyblok-react"
import "../style/featured.css"
import Img from "gatsby-image"
import { getFluidGatsbyImage } from "gatsby-storyblok-image"

const Featured = ({ blok }) => {
  console.log(blok)
  const image = getFluidGatsbyImage(blok.background_image.filename, {
    maxWidth: 900,
  })
  return (
    <SbEditable content={blok} key={blok._uid}>
      <div className="featured-container">
        <Img
          fluid={image}
          alt={blok.background_image.alt}
          title={blok.background_image.copyright}
          className="featured-image-container"
          objectFit="cover"
          imgStyle={{
            width: "100%",
            height: "100%",
            objectFit: "100%",
          }}
        />
      </div>
    </SbEditable>
  )
}

export default Featured

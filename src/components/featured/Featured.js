import React from "react"
import SbEditable from "storyblok-react"
import "../../style/featured.css"
import Img from "gatsby-image"
import { getFluidGatsbyImage } from "gatsby-storyblok-image"
import DynamicComponent from "../DynamicComponent"

const Copyright = ({ text }) => {
  return <span className="featured-copyright">{text}</span>
}

const Featured = ({ blok, backgroundColor, color, objectFit }) => {
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
            objectFit,
            backgroundColor,
            color,
          }}
        />
        <div
          className="featured-image-overlay"
          style={{
            backgroundColor: blok.overlay_color.color,
            opacity: blok.overlay_opacity,
          }}
        />
        <div
          className="featured-body"
          style={{
            color: blok.text_color.color,
          }}
        >
          {blok.body.map(item => {
            return <DynamicComponent key={item._uid} blok={item} />
          })}
          {blok.background_image.copyright != null ? (
            <Copyright text={blok.background_image.copyright} />
          ) : null}
        </div>
      </div>
    </SbEditable>
  )
}

Featured.defaultProps = {
  color: "#FFFFFF",
  backgroundColor: "#000000",
  objectFit: "100%",
}

export default Featured

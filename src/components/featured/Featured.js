import React from "react"
import SbEditable from "storyblok-react"
import "../../style/featured.css"
import Img from "gatsby-image"
import { getFluidGatsbyImage } from "gatsby-storyblok-image"
import DynamicComponent from "../DynamicComponent"

const Copyright = ({ text }) => {
  return <span className="featured-copyright">{text}</span>
}

const Featured = ({ blok }) => {
  const image = getFluidGatsbyImage(blok.background_image.filename, {
    maxWidth: 900,
  })

  if (blok.objectFit == null) blok.objectFit = "100%"
  if (blok.background_color?.color == null)
    blok.background_color = {
      color: "#000000",
    }
  if (blok.text_color?.color == null)
    blok.text_color = {
      color: "#FFFFFF",
    }

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
            objectFit: blok.object_fit,
            backgroundColor: blok.background_color.color,
            color: blok.text_color.color,
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

export default Featured

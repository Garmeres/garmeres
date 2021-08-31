import React from "react"
import SbEditable from "storyblok-react"
import "../style/person.css"
import Img from "gatsby-image"
import { getFixedGatsbyImage } from "gatsby-storyblok-image"

const Person = ({ blok }) => {
  const fixed =
    blok.image.filename != ""
      ? getFixedGatsbyImage(blok.image.filename, { width: 480 })
      : null
  return (
    <SbEditable content={blok} key={blok._uid}>
      <div className="person-container">
        <div className="person-image-container">
          {fixed != null ? (
            <Img
              className="person-image"
              fixed={fixed}
              alt={fixed.alt}
              imgStyle={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
                zIndex: 0,
              }}
              style={{
                height: "100%",
                width: "100%",
                zIndex: 0,
              }}
            />
          ) : null}
        </div>
        <div className="person-info-container">
          <h2 className="person-name">{blok.name}</h2>
          {blok.title != null && blok.title != "" ? (
            <span className="person-title">{blok.title}</span>
          ) : null}
          <span className="person-image-copyright">{blok.image.copyright}</span>
        </div>
      </div>
    </SbEditable>
  )
}

export default Person

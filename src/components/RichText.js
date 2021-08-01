import React from "react"
import SbEditable from "storyblok-react"
import { render, NODE_IMAGE } from "storyblok-rich-text-react-renderer"
import "../style/rich-text.css"
import Img from "gatsby-image"
import { getFixedGatsbyImage } from "gatsby-storyblok-image"

const RichText = ({ blok }) => {
  // document is the rich text object you receive from Storyblok,
  // in the form { type: "doc", content: [ ... ] }
  return (
    <SbEditable content={blok} key={blok._uid}>
      <div className="rich-text">
        {render(blok.text, {
          nodeResolvers: {
            [NODE_IMAGE]: (children, props) => {
              const fixed = getFixedGatsbyImage(props.src, {
                width: 640,
              })
              console.log(fixed)
              return (
                <div className="rich-text-image-container">
                  <Img
                    className="rich-text-image"
                    fixed={fixed}
                    alt={props.alt}
                    imgStyle={{
                      objectFit: "contain",
                      zIndex: 0,
                      width: "100%",
                      maxWidth: fixed.width,
                      margin: "auto",
                    }}
                    style={{
                      zIndex: 0,
                      width: "100%",
                    }}
                  />
                  <span className="rich-text-image-title">{props.title}</span>
                </div>
              )
            },
          },
        })}
      </div>
    </SbEditable>
  )
}

export default RichText

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
              return (
                <Img
                  fixed={getFixedGatsbyImage(props.src)}
                  alt={props.alt}
                  imgStyle={{
                    objectFit: "contain",
                  }}
                />
              )
            },
          },
        })}
      </div>
    </SbEditable>
  )
}

export default RichText

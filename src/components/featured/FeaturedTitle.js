import React from "react"
import SbEditable from "storyblok-react"

const FeaturedTitle = ({ blok }) => {
  return (
    <SbEditable content={blok}>
      <h1>{blok.text}</h1>
    </SbEditable>
  )
}

export default FeaturedTitle

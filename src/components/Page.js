import React from "react"
import DynamicComponent from "./DynamicComponent"
import SbEditable from "storyblok-react"

const Page = ({ blok }) => {
  const content =
    blok.body != null
      ? blok.body.map(childBlok => (
          <DynamicComponent blok={childBlok} key={childBlok._uid} />
        ))
      : null

  return <SbEditable content={blok}>{content}</SbEditable>
}

export default Page

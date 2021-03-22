import React from "react"
import SbEditable from "storyblok-react"

const CallToAction = ({ blok }) => {
  return (
    <SbEditable content={blok}>
      <div className="featured-call-to-action" role="button">
        {blok.text}
      </div>
    </SbEditable>
  )
}

export default CallToAction

import React from "react"
import SbEditable from "storyblok-react"
import { Link } from "gatsby"

const CallToAction = ({ blok }) => {
  return (
    <SbEditable content={blok}>
      <div className="featured-call-to-action">
        <Link
          to={`/${
            blok.link.story != null ? blok.link.story.full_slug : blok.link.url
          }`}
          style={{
            color: blok.color.color,
          }}
        >
          <div
            className="call-to-action-background"
            style={{
              backgroundColor: blok.background_color.color,
              opacity: blok.opacity,
            }}
          />
          <span className="call-to-action-text">{blok.text}</span>
        </Link>
      </div>
    </SbEditable>
  )
}

export default CallToAction

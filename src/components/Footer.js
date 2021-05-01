import React from "react"
import "../style/rich-text.css"
import DynamicComponent from "./DynamicComponent"
import SbEditable from "storyblok-react"

const Footer = ({ blok }) => {
  const content = JSON.parse(blok.content)
  return (
    <SbEditable content={blok} key={blok._uid}>
      <footer>
        <div id="footer-content">
          {content.body.map(component => (
            <DynamicComponent blok={component} key={component._uid} />
          ))}
        </div>
      </footer>
    </SbEditable>
  )
}

export default Footer

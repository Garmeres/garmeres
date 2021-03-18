import React from "react"
import Teaser from "./Teaser"
import Placeholder from "./Placeholder"
import LogoImage from "./image-components/LogoImage"
import LanguageSelector from "./index/LanguageSelector"
import RichText from "./RichText"

const Components = {
  teaser: Teaser,
  logo_image: LogoImage,
  language_selector: LanguageSelector,
  rich_text: RichText,
}

const Component = ({ blok }) => {
  if (typeof Components[blok.component] !== "undefined") {
    const Component = Components[blok.component]
    return <Component blok={blok} />
  }
  return blok.component ? <Placeholder componentName={blok.component} /> : null
}

export default Component

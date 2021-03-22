import React from "react"
import Teaser from "./Teaser"
import Placeholder from "./Placeholder"
import LogoImage from "./image-components/LogoImage"
import LanguageSelector from "./index/LanguageSelector"
import RichText from "./RichText"
import Featured from "./featured/Featured"
import FeaturedTitle from "./featured/FeaturedTitle"
import FeaturedText from "./featured/FeaturedText"
import CallToAction from "./featured/CallToAction"

const Components = {
  teaser: Teaser,
  logo_image: LogoImage,
  language_selector: LanguageSelector,
  rich_text: RichText,
  featured: Featured,
  featured_title: FeaturedTitle,
  featured_text: FeaturedText,
  call_to_action: CallToAction,
}

const Component = ({ blok }) => {
  if (typeof Components[blok.component] !== "undefined") {
    const Component = Components[blok.component]
    return <Component blok={blok} />
  }
  return blok.component ? <Placeholder componentName={blok.component} /> : null
}

export default Component

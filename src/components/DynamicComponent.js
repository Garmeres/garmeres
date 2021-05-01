import React from "react"
import { formatDateNow } from "../utils/format-helper"
import Placeholder from "./Placeholder"
import LogoImage from "./image-components/LogoImage"
import LanguageSelector from "./index/LanguageSelector"
import RichText from "./RichText"
import Featured from "./featured/Featured"
import FeaturedTitle from "./featured/FeaturedTitle"
import FeaturedText from "./featured/FeaturedText"
import CallToAction from "./featured/CallToAction"
import BlogBrowser from "./blog/blog-browser"
import Footer from "./Footer"

const CustomText = ({ blok }) => {
  return <span>{blok.text}</span>
}

const PublishedAt = ({ blok }) => {
  return (
    <span>
      {blok.label} {formatDateNow()}
    </span>
  )
}

const Components = {
  logo_image: LogoImage,
  language_selector: LanguageSelector,
  rich_text: RichText,
  featured: Featured,
  featured_title: FeaturedTitle,
  featured_text: FeaturedText,
  call_to_action: CallToAction,
  blog_browser: BlogBrowser,
  footer: Footer,
  custom_text: CustomText,
  last_published: PublishedAt,
}

const Component = ({ blok }) => {
  if (typeof Components[blok.component] !== "undefined") {
    const Component = Components[blok.component]
    return <Component blok={blok} />
  }
  return blok.component ? <Placeholder componentName={blok.component} /> : null
}

export default Component

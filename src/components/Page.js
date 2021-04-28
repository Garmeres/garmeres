import React from "react"
import DynamicComponent from "./DynamicComponent"
import SbEditable from "storyblok-react"
import { formatDateString, formatDateNow } from "../utils/format-helper"

const Page = ({ blok, heading }) => {
  const content = [
    heading != null ? (
      <div key="page-heading" id="page-heading">
        {heading.title != null ? <h1>{heading.title}</h1> : null}
        <span>
          {heading.published_at != null
            ? formatDateString(heading.published_at)
            : formatDateNow()}{" "}
          {heading.published_at != null && heading.author != null ? "-" : null}{" "}
          {heading.author != null ? heading.author : null}
        </span>
      </div>
    ) : null,
  ].concat(
    blok.body.map(childBlok => (
      <DynamicComponent blok={childBlok} key={childBlok._uid} />
    ))
  )

  return <SbEditable content={blok}>{content}</SbEditable>
}

export default Page

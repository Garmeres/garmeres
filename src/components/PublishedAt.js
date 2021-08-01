import React from "react"
import { formatDateString } from "../utils/format-helper"
import { graphql, useStaticQuery } from "gatsby"

const PublishedAt = ({ blok }) => {
  const data = useStaticQuery(graphql`
    query publishedAtQuery {
      site {
        buildTime
      }
    }
  `)

  return (
    <span>
      {blok.label} {formatDateString(data.site.buildTime)}
    </span>
  )
}

export default PublishedAt

import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"

const query = graphql`
  query headerLangSelector {
    settings: allStoryblokEntry(filter: { name: { eq: "Settings" } }) {
      edges {
        node {
          id
          lang
          content
        }
      }
    }
  }
`

export default ({ siblings, lang }) => {
  return (
    <StaticQuery
      query={query}
      render={data => {
        return (
          <div id="header-language-selector">
            {siblings.edges.map(({ node }) => {
              return (
                <Link
                  key={node.lang}
                  to={`/${node.full_slug}`}
                  style={{
                    textDecoration: node.lang == lang ? "underline" : "none",
                  }}
                >
                  {node.lang == "default" ? "en" : node.lang}
                </Link>
              )
            })}
          </div>
        )
      }}
    />
  )
}

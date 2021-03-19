import React from "react"
import { graphql, StaticQuery, Link } from "gatsby"

const query = graphql`
  query LanguageMenu {
    languageLabels: allStoryblokEntry(
      filter: { slug: { eq: "language-label" } }
    ) {
      edges {
        node {
          lang
          content
        }
      }
    }
  }
`

const LanguageMenu = ({ siblings, lang }) => {
  return (
    <StaticQuery
      query={query}
      render={data => {
        return (
          <div id="sidebar-language-menu">
            {data.languageLabels.edges.map(({ node }) => {
              const nodeLang = node.lang
              const full_slug = siblings.edges.find(
                ({ node }) => node.lang == nodeLang
              ).node.full_slug
              return (
                <Link
                  to={`/${full_slug}`}
                  style={{
                    textDecoration: nodeLang === lang ? "underline" : "none",
                  }}
                >
                  {JSON.parse(node.content).language_label}
                </Link>
              )
            })}
          </div>
        )
      }}
    />
  )
}

export default LanguageMenu
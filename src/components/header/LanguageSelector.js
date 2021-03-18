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
        const nodes = data.settings.edges.map(({ node }) => {
          return {
            id: node.id,
            lang: node.lang,
            language_label: JSON.parse(node.content).language_label,
            full_slug:
              siblings != null && siblings.edges.length > 0
                ? `/${
                    siblings.edges.find(other => other.node.lang == node.lang)
                      .node.full_slug
                  }`
                : `/${node.lang != "default" ? node.lang : "en"}`,
          }
        })
        return (
          <div id="header-language-selector">
            {nodes.map(node => {
              return (
                <Link
                  key={node.lang}
                  to={`${node.full_slug}`}
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

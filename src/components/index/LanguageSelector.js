import React from "react"
import SbEditable from "storyblok-react"
import { StaticQuery, graphql, Link } from "gatsby"

const query = graphql`
  query LanguageQuery {
    settings: allStoryblokEntry(filter: { name: { eq: "Settings" } }) {
      edges {
        node {
          id
          lang
          content
        }
      }
    }
    homePages: allStoryblokEntry(filter: { name: { eq: "Home" } }) {
      edges {
        node {
          lang
          full_slug
        }
      }
    }
  }
`

const LangOption = ({ node }) => {
  const content = JSON.parse(node.content)
  return <Link to=""></Link>
}

const Selector = ({ blok }) => {
  return (
    <StaticQuery
      query={query}
      render={data => {
        return (
          <SbEditable content={blok} key={blok._uid}>
            <div id="language-selector">
              {data.settings.edges.map(({ node }) => {
                const content = JSON.parse(node.content)
                const lang = node.lang
                const full_slug = data.homePages.edges.find(({ node }) => {
                  return node.lang == lang
                }).node.full_slug
                return (
                  <Link key={node.id} to={full_slug}>
                    {content.language_label}
                  </Link>
                )
              })}
            </div>
          </SbEditable>
        )
      }}
    ></StaticQuery>
  )
}

export default Selector

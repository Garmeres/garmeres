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
  }
`

const LangOption = ({ node }) => {
  const content = JSON.parse(node.content)
  console.log(content)
  return (
    <Link to={`${node.lang != "default" ? node.lang : "en"}/`}>
      {content.language_label}
    </Link>
  )
}

const Selector = ({ blok }) => {
  return (
    <StaticQuery
      query={query}
      render={data => {
        console.log(data)
        return (
          <SbEditable content={blok} key={blok._uid}>
            <div id="language-selector">
              {data.settings.edges.map(({ node }) => (
                <LangOption node={node} />
              ))}
            </div>
          </SbEditable>
        )
      }}
    ></StaticQuery>
  )
}

export default Selector

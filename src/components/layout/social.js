import React from "react"
import { graphql, StaticQuery, Link } from "gatsby"
import { IconContext } from "react-icons"
import { FaFacebookSquare, FaInstagram } from "react-icons/fa"
import "../../style/social.css"

const query = graphql`
  query Social {
    socials: allStoryblokEntry(filter: { field_component: { eq: "social" } }) {
      edges {
        node {
          lang
          content
        }
      }
    }
  }
`

const SocialIcon = ({ Icon, url }) => {
  return (
    <IconContext.Provider value={{ className: "social-icon", size: 25 }}>
      <a href={url}>
        <Icon />
      </a>
    </IconContext.Provider>
  )
}

const Social = ({ lang }) => {
  return (
    <StaticQuery
      query={query}
      render={data => {
        const content = JSON.parse(
          data.socials.edges.find(({ node }) => node.lang == lang).node.content
        )
        return (
          <div id="social-container">
            <SocialIcon Icon={FaFacebookSquare} url={content.facebook.url} />
            <SocialIcon Icon={FaInstagram} url={content.instagram.url} />
          </div>
        )
      }}
    ></StaticQuery>
  )
}

export default Social

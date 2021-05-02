import React from "react"
import { graphql, StaticQuery } from "gatsby"
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

const SocialIcon = ({ Icon, url, label = "Social" }) => {
  return (
    <IconContext.Provider value={{ className: "social-icon", size: 25 }}>
      <a href={url != null ? url : "/"} target="blank" aria-label={label}>
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
        const rawNode = data.socials.edges.find(
          ({ node }) => node.lang === lang
        )
        const rawContent = rawNode != null ? rawNode.node.content : null
        const content = rawContent != null ? JSON.parse(rawContent) : null
        return (
          <div id="social-container">
            <SocialIcon
              label="Facebook"
              Icon={FaFacebookSquare}
              url={content != null ? content.facebook.url : null}
            />
            <SocialIcon
              label="Instagram"
              Icon={FaInstagram}
              url={content != null ? content.instagram.url : null}
            />
          </div>
        )
      }}
    ></StaticQuery>
  )
}

export default Social

import React from "react"
import { graphql, Link, StaticQuery } from "gatsby"
import "../../style/sidebar.css"
import { getFluidGatsbyImage } from "gatsby-storyblok-image"
import Img from "gatsby-image"

const query = graphql`
  query SidebarQuery {
    storyblokEntry(field_component: { eq: "menu" }) {
      content
    }

    menuData: allMenuData {
      edges {
        node {
          id
          lang
          menuItems {
            name
            full_slug
          }
        }
      }
    }
  }
`

const Logo = ({ filename, text }) => {
  const image = getFluidGatsbyImage(filename, {
    maxWidth: 180,
  })
  return (
    <div className="sidebar-logo-container">
      <Link to="/">
        <div id="sidebar-logo-image-container">
          <Img className="sidebar-logo-image" fluid={image} />
        </div>
        <span id="sidebar-logo-text">{text}</span>
      </Link>
    </div>
  )
}

const Sidebar = ({ siblings, lang }) => {
  return (
    <StaticQuery
      query={query}
      render={data => {
        const menuData = data.menuData.edges.find(({ node }) => {
          return node.lang === lang
        }).node
        const content = JSON.parse(data.storyblokEntry.content)

        return (
          <div id="sidebar-container">
            <Logo filename={content.logo.filename} text={content.logo_text} />
            {menuData.menuItems.map(item => {
              return (
                <Link
                  className="sidebar-menu-item"
                  to={`/${item.full_slug}`}
                  key={item.full_slug}
                >
                  {item.name}
                </Link>
              )
            })}
          </div>
        )
      }}
    />
  )
}

export default Sidebar

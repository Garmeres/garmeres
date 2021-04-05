import React from "react"
import { graphql, StaticQuery } from "gatsby"
import "../../style/sidebar.css"
import "../../style/mobile-header.css"
import { getFluidGatsbyImage } from "gatsby-storyblok-image"
import MobileHeader from "./mobile-header"
import DesktopSidebar from "./desktop-sidebar"

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

const Header = ({ siblings, lang }) => {
  return (
    <StaticQuery
      query={query}
      render={data => {
        const menu = data.menuData.edges.find(
          menuNode => menuNode.node.lang === lang
        )
        const menuData = menu != null ? menu.node : null
        const content = JSON.parse(data.storyblokEntry.content)
        const logoImage = getFluidGatsbyImage(content.logo.filename, {
          maxWidth: 180,
        })

        return (
          <div id="header-container">
            <DesktopSidebar
              content={content}
              menuData={menuData}
              lang={lang}
              siblings={siblings}
              logoImage={logoImage}
            />
            <MobileHeader
              content={content}
              menuData={menuData}
              lang={lang}
              siblings={siblings}
              logoImage={logoImage}
            />
          </div>
        )
      }}
    />
  )
}

export default Header

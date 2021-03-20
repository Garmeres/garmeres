import React, { useState } from "react"
import { graphql, Link, StaticQuery } from "gatsby"
import "../../style/sidebar.css"
import { getFluidGatsbyImage } from "gatsby-storyblok-image"
import Img from "gatsby-image"
import LanguageMenu from "./language-menu"
import Social from "./social"

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

const Logo = ({ image, text }) => {
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

const BurgerButton = ({ onClick }) => {
  return (
    <div className="burger-button-container" onClick={onClick} role="button">
      <div className="burger-button-bar" />
      <div className="burger-button-bar" />
      <div className="burger-button-bar" />
      <div className="burger-button-bar" />
    </div>
  )
}

const MobileHeader = ({ content, menuData, lang, siblings, logoImage }) => {
  const [visibility, setVisibility] = useState("hidden")

  return (
    <div id="mobile-header-container">
      <Logo image={logoImage} text={content.logo_text} />
      <Social lang={lang} />
      <div id="mobile-header-left">
        <BurgerButton onClick={() => {}} />
      </div>
    </div>
  )
}

const DesktopSidebar = ({ content, menuData, lang, siblings, logoImage }) => {
  return (
    <div id="sidebar-container">
      <Logo image={logoImage} text={content.logo_text} />
      <div id="sidebar-content-container">
        <div id="sidebar-menu-items-container">
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
        <div id="sidebar-menu-footer">
          <Social lang={lang} />
          <LanguageMenu siblings={siblings} lang={lang} />
        </div>
      </div>
    </div>
  )
}

const Sidebar = ({ siblings, lang, location }) => {
  return (
    <StaticQuery
      query={query}
      render={data => {
        const menuData = data.menuData.edges.find(
          menuNode => menuNode.node.lang == lang
        ).node
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

export default Sidebar

import React from "react"
import Logo from "./header-logo"
import LanguageMenu from "./language-menu"
import Social from "./social"
import { Link } from "gatsby"

const DesktopSidebar = ({ content, menuData, lang, siblings, logoImage }) => {
  return (
    <div id="sidebar-container">
      <Logo image={logoImage} text={content.logo_text} />
      <div id="sidebar-content-container">
        <div id="sidebar-menu-items-container">
          {menuData != null
            ? menuData.menuItems.map(item => {
                return (
                  <Link
                    className="sidebar-menu-item"
                    to={`/${item.full_slug}`}
                    key={item.full_slug}
                  >
                    {item.name}
                  </Link>
                )
              })
            : null}
        </div>
        <div id="sidebar-menu-footer">
          <Social lang={lang} />
          <LanguageMenu siblings={siblings} lang={lang} />
        </div>
      </div>
    </div>
  )
}

export default DesktopSidebar

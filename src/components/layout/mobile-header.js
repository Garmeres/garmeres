import React, { useState } from "react"
import Social from "./social"
import Logo from "./header-logo"
import BurgerButton from "./burger-button"
import { Link } from "gatsby"
import LanguageMenu from "./language-menu"

const MobileMenu = ({ menuData, lang, siblings, show, toggleMenu }) => {
  return (
    <div
      id="mobile-menu-container"
      className={`${show != null ? (show ? "visible" : "hidden") : ""}`}
    >
      <div
        id="mobile-menu-overlay"
        className={`${show != null ? (show ? "visible" : "hidden") : ""}`}
        onClick={toggleMenu}
      />
      <div
        id="mobile-menu"
        className={`${show != null ? (show ? "visible" : "hidden") : ""}`}
      >
        <div id="mobile-menu-content-container">
          {menuData != null
            ? menuData.menuItems.map(item => {
                return item != null ? (
                  <div
                    className="mobile-menu-item-container"
                    key={item.full_slug}
                  >
                    <Link
                      to={`/${item.full_slug}`}
                      className="mobile-menu-item"
                    >
                      {item.name}
                    </Link>
                  </div>
                ) : null
              })
            : null}
        </div>
        <LanguageMenu siblings={siblings} lang={lang} />
      </div>
    </div>
  )
}

const MobileHeader = ({ content, menuData, lang, siblings, logoImage }) => {
  const [showMenu, setShowMenu] = useState(null)

  function toggleMenu() {
    if (showMenu != null) {
      setShowMenu(!showMenu)
    } else setShowMenu(true)
  }

  return (
    <nav id="mobile-header-container" aria-labelledby="hamburger">
      <div id="mobile-header-content-container">
        <Logo image={logoImage} text={content.logo_text} />

        <div id="mobile-header-left">
          <Social lang={lang} />
          <BurgerButton onClick={() => toggleMenu()} />
        </div>
      </div>
      <MobileMenu
        menuData={menuData}
        lang={lang}
        siblings={siblings}
        show={showMenu}
        toggleMenu={() => setShowMenu(false)}
      />
    </nav>
  )
}
export default MobileHeader

import React, { useState } from "react"
import Social from "./social"
import Logo from "./header-logo"
import BurgerButton from "./burger-button"

const MobileMenu = ({ menuData, lang, siblings, show }) => {
  return (
    <div id="mobile-menu-container">
      <div
        id="mobile-menu-overlay"
        className={`${show != null ? (show ? "visible" : "hidden") : ""}`}
      ></div>
      <div
        id="mobile-menu"
        role="menu"
        className={`${show != null ? (show ? "visible" : "hidden") : ""}`}
      ></div>
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
    <div id="mobile-header-container">
      <div id="mobile-header-content-container">
        <Logo image={logoImage} text={content.logo_text} />
        <Social lang={lang} />
        <div id="mobile-header-left">
          <BurgerButton onClick={() => toggleMenu()} />
        </div>
      </div>
      <MobileMenu
        menuData={menuData}
        lang={lang}
        siblings={siblings}
        show={showMenu}
      />
    </div>
  )
}
export default MobileHeader

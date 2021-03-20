import React, { useState } from "react"
import Social from "./social"
import Logo from "./header-logo"
import BurgerButton from "./burger-button"

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
export default MobileHeader

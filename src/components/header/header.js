import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import LanguageSelector from "./LanguageSelector"

const Header = ({ siteTitle, siblings, lang }) => (
  <header>
    <h1>
      <Link to="/">{siteTitle}</Link>
    </h1>
    <LanguageSelector siblings={siblings} lang={lang} />
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header

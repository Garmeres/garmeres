import * as React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import StoryblokService from "../utils/storyblok-service"

import Header from "../components/header/header"
import "../style/layout.css"

const Layout = ({ children, siblings, lang }) => {
  return (
    <>
      <Helmet
        script={[
          {
            src: `//app.storyblok.com/f/storyblok-latest.js?t=${StoryblokService.token}`,
            type: "text/javascript",
          },
        ]}
      />
      <Helmet
        script={[
          {
            innerHTML: `var StoryblokCacheVersion = '${StoryblokService.getCacheVersion()}';`,
            type: "text/javascript",
          },
        ]}
      />
      <main>{children}</main>
      <footer></footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

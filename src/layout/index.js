import * as React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import StoryblokService from "../utils/storyblok-service"

import "../style/index.css"

const Layout = ({ children }) => {
  return (
    <div id="page-container">
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
      <footer>Footer</footer>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

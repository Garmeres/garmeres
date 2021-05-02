import * as React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import StoryblokService from "../utils/storyblok-service"

import "../style/index.css"

const Layout = ({ children }) => {
  return (
    <div id="page-container">
      <Helmet
        htmlAttributes={{
          lang: "en",
        }}
      />
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
      <main id="index-main">{children}</main>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

import * as React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import StoryblokService from "../utils/storyblok-service"

import Header from "../components/header"
import "../style/layout.css"

const Layout = ({ children }) => {
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
      <Header siteTitle="Garmeres" />
      <main>{children}</main>
      <footer></footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

import * as React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import StoryblokService from "../utils/storyblok-service"
import "../style/layout.css"
import Header from "../components/layout/header"
import Footer from "../components/Footer"

const Layout = ({ children, siblings, lang, location, footer, seo }) => {
  return (
    <div id="page-container">
      <Helmet
        htmlAttributes={{
          lang: lang === "default" ? "en" : lang,
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
      <Header
        siblings={siblings}
        lang={lang != null ? lang : "default"}
        location={location}
      />
      <main>
        {children}
        {footer != null ? <Footer blok={footer} /> : null}
      </main>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

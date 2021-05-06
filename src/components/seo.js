import * as React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"

function SEO({ description, lang, meta = [], title, content, image, url }) {
  const metaDescription = description || content.description
  const defaultTitle = title ? content.title : null
  return (
    <Helmet titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : null}>
      <html lang={lang === "default" ? "en" : "no"} />
      <title>{title ? title : content.title}</title>
      <meta name="description" content={metaDescription} />

      <meta name="og:url" content={url} />
      <meta name="og:title" content={title ? title : content.title} />
      <meta name="og:description" content={metaDescription} />

      <meta name="og:type" content="website" />
      <meta name="og:site_name" content="Garmeres" />

      {image != null ? <meta name="og:image" content={image} /> : null}

      {image != null ? (
        <meta name="twitter:image:alt" content="Preview of Garmeres.com" />
      ) : null}

      {meta.map(item => (
        <meta name={item.name} content={item.content} />
      ))}
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
}

export default SEO

import * as React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"

function SEO({
  description,
  lang,
  meta = [],
  title,
  content,
  image = "https://img2.storyblok.com/f/108732/636x568/03f2924953/flagg-1.png",
  url,
}) {
  const metaDescription = description || content.description
  const defaultTitle = title ? content.title : null
  return (
    <Helmet titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : null}>
      <html lang={lang === "default" ? "en" : "no"} />
      <title>{title != null && title !== "" ? title : content.title}</title>
      <meta
        name="title"
        content={title != null && title !== "" ? title : content.title}
      />
      <meta name="description" content={metaDescription} />

      <meta property="og:url" content={url} />
      <meta
        property="og:title"
        content={title != null && title !== "" ? title : content.title}
      />
      <meta property="og:description" content={metaDescription} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Garmeres" />

      {image != null ? <meta property="og:image" content={image} /> : null}
      {image != null ? <meta property="twitter:image" content={image} /> : null}
      {image != null ? (
        <meta property="twitter:image:alt" content="Preview of Garmeres.com" />
      ) : null}

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta
        property="twitter:title"
        content={title != null && title !== "" ? title : content.title}
      />
      <meta property="twitter:description" content={metaDescription} />

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

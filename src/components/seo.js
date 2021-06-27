import * as React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"

function SEO({
  description,
  lang,
  meta = [],
  title,
  content,
  image,
  imageAlt,
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

      <meta name="og:url" property="og:url" content={url} />
      <meta
        name="og:title"
        property="og:title"
        content={title != null && title !== "" ? title : content.title}
      />
      <meta
        name="og:description"
        property="og:description"
        content={metaDescription}
      />

      <meta name="og:type" property="og:type" content="website" />
      <meta
        name="og:site_name"
        property="og:site_name"
        content={content.title}
      />

      {image != null ? (
        <meta name="og:image" property="og:image" content={image} />
      ) : null}
      {image != null ? (
        <meta name="twitter:image" property="twitter:image" content={image} />
      ) : null}
      {image != null ? (
        <meta
          name="twitter:image:alt"
          property="twitter:image:alt"
          content={
            imageAlt != null && imageAlt !== ""
              ? imageAlt
              : "Preview of Garmeres.com"
          }
        />
      ) : null}

      <meta
        name="twitter:card"
        property="twitter:card"
        content="summary_large_image"
      />
      <meta name="twitter:url" property="twitter:url" content={url} />
      <meta
        name="twitter:title"
        property="twitter:title"
        content={title != null && title !== "" ? title : content.title}
      />
      <meta name="twitter:description" property="twitter:description" content={metaDescription} />

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

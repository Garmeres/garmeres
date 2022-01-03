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
  altVersions = [],
}) {
  const metaDescription = description || content.description
  const defaultTitle = title ? content.title : null
  const altLang = altVersions.find(v => v.lang === lang)
  return (
    <Helmet titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : null}>
      <html
        lang={
          altLang != null
            ? altLang.language_code
            : lang === "default"
            ? "en"
            : lang
        }
      />
      {altVersions.map(v => {
        return [
          <link
            key={v.language_code}
            rel="alternate"
            href={v.canonical_link}
            hrefLang={v.language_code}
          />,
          v.lang === lang ? <link rel="canonical" href={v.canonical_link} /> : null,
        ]
      })}
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
      <meta property="og:site_name" content={content.title} />

      {image != null ? <meta property="og:image" content={image} /> : null}
      {image != null ? <meta property="twitter:image" content={image} /> : null}
      {image != null ? (
        <meta
          property="twitter:image:alt"
          content={
            imageAlt != null && imageAlt !== ""
              ? imageAlt
              : "Preview of Garmeres.com"
          }
        />
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

const { blocksToText } = require("./blocks-to-text")
const { removeEscape } = require("./format-helper")

const title = {
  default: story => {
    const translated = story.translated_slugs.find(
      item => item.lang === story.lang
    )?.name
    return story.lang === "default" || translated == null
      ? story.name
      : translated
  },
}

const description = {
  default: story => null,
  "blog-post": story => removeEscape(blocksToText(story.content.body)),
}

const image = {
  default: story =>
    "https://img2.storyblok.com/f/108732/636x568/03f2924953/flagg-1.png",

  "blog-post": story =>
    story.content.thumbnail != null && story.content.thumbnail.filename !== ""
      ? story.content.thumbnail.filename
      : image.default(story),
}

const url = {
  default: story => story.full_slug,
}

const lang = {
  default: story => (story.lang === "default" ? "en" : story.lang),
}

const resolvers = {
  title,
  description,
  image,
  url,
  lang,
}

const getSeoFromStory = story => {
  var result = {}

  const component = story.content.component
  const fields = Object.entries(resolvers).map(item => item[0])

  fields.map(field => {
    result[field] =
      resolvers[field][component] != null
        ? resolvers[field][component](story)
        : resolvers[field]["default"](story)
  })

  return result
}

export { getSeoFromStory }

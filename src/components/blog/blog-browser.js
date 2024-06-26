import React, { useEffect, useState } from "react"
import SbEditable from "storyblok-react"
import StoryblokClient from "storyblok-js-client"
import { getFluidGatsbyImage } from "gatsby-storyblok-image"
import "../../style/blog-browser.css"
import Img from "gatsby-image"
import EllipsisText from "../EllipsisText"
import { blocksToText } from "../../utils/blocks-to-text"
import { Link } from "gatsby"
import ClipLoader from "react-spinners/BeatLoader"

let Storyblok = new StoryblokClient({
  accessToken: "cqYfQpnpPi9yS2MBQADiQQtt",
  cache: {
    clear: "auto",
    type: "memory",
  },
})

const BlogPost = ({ story }) => {
  const filename =
    story.content.thumbnail != null && story.content.thumbnail.filename !== ""
      ? story.content.thumbnail.filename
      : "https://a.storyblok.com/f/108732/636x568/03f2924953/flagg-1.png"

  const thumbnail = getFluidGatsbyImage(filename, {
    maxWidth: 360,
  })

  return (
    <Link to={`/${story.full_slug}`} className="blog-browser-post-container">
      <div className="blog-post-thumbnail" to="/">
        <Img
          fluid={thumbnail}
          objectFit="cover"
          objectPosition="50% 50%"
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </div>
      <div className="blog-post-body">
        <h2>{story.title}</h2>
        <EllipsisText text={blocksToText(story.content.body)} />
        <span className="read-more">Read more</span>
      </div>
    </Link>
  )
}

const MoreButton = ({ isLoading, onClick }) => {
  return (
    <div id="show-more-button-container">
      {isLoading ? (
        <ClipLoader
          loading={isLoading}
          css={{
            margin: "auto",
          }}
          margin={4}
          size={10}
          color="#999"
        />
      ) : (
        <button onClick={onClick}>Show more...</button>
      )}
    </div>
  )
}

async function getLang() {
  const stories = await Storyblok.get("cdn/stories", {
    starts_with: "home",
  })

  return stories.data.stories[0].translated_slugs.map(item => item.lang)
}

async function getFallbackUrl(blok) {
  const cachedUrl = blok.source_path.cached_url
  if (cachedUrl.length > 0) {
    const languages = await getLang()
    const blokLang = cachedUrl
      .split("/")
      .filter(i => i !== "/" && i.length > 0 && languages.includes(i))[0]
    return blokLang != null ? `${blokLang}/*` : blokLang
  } else return undefined
}

const BlogBrowser = ({ blok }) => {
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function getStories() {
      const stories = await Storyblok.get("cdn/stories", {
        starts_with:
          blok.source_path.story != null
            ? blok.source_path.story.full_slug
            : await getFallbackUrl(blok),
        is_startpage: 0,
        page: page,
        per_page: blok.page_capacity,
        sort_by: "first_published_at:desc",
        filter_query: {
          component: {
            in: "blog-post,blog_post",
          },
        },
      })

      setMaxPage(Math.ceil(stories.headers.total / stories.headers["per-page"]))
      setPosts(
        posts.concat(
          stories.data.stories.map(story => {
            var title = story.name
            var translated = story.translated_slugs.find(
              item => item.lang === story.lang
            )
            if (translated != null) {
              title = translated.name != null ? translated.name : story.name
            }
            return { ...story, title }
          })
        )
      )
      setIsLoading(false)
    }

    getStories()
  }, [page])

  var i = 0

  return (
    <SbEditable content={blok} key={blok._uid}>
      <div className="blog-browser">
        <div className="blog-browser-header"></div>
        <div className="blog-browser-body">
          {posts.map(post => (
            <BlogPost key={i++} story={post} />
          ))}
          <div className="blog-browser-post-empty"></div>
        </div>
        {page < maxPage ? (
          <MoreButton
            isLoading={isLoading}
            onClick={() => {
              if (page < maxPage) {
                setIsLoading(true)
                setPage(page + 1)
              }
            }}
          />
        ) : null}
      </div>
    </SbEditable>
  )
}

export default BlogBrowser

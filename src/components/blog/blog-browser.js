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
  const thumbnail = getFluidGatsbyImage(story.content.thumbnail.filename, {
    maxWidth: 360,
  })

  return (
    <div className="blog-browser-post-container">
      <div className="blog-post-thumbnail">
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
        <Link to={`/${story.full_slug}`}>Read more</Link>
      </div>
    </div>
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

export default ({ blok }) => {
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function getStories() {
      const stories = await Storyblok.get("cdn/stories", {
        starts_with: blok.source_path.story.full_slug,
        is_startpage: 0,
        page: page,
        per_page: blok.page_capacity,
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

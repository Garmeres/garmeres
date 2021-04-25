import React, { useEffect, useState } from "react"
import SbEditable from "storyblok-react"
import StoryblokClient from "storyblok-js-client"
import { getFluidGatsbyImage } from "gatsby-storyblok-image"
import "../../style/blog-browser.css"
import Img from "gatsby-image"
import EllipsisText from "../EllipsisText"
import { blocksToText } from "../../utils/blocks-to-text"
import { Link } from "gatsby"

let Storyblok = new StoryblokClient({
  accessToken: "cqYfQpnpPi9yS2MBQADiQQtt",
  cache: {
    clear: "auto",
    type: "memory",
  },
})

const BlogPost = ({ story }) => {
  const thumbnail = getFluidGatsbyImage(story.content.thumbnail.filename, {
    maxWidth: 340,
  })

  return (
    <div className="blog-browser-post-container">
      <div className="blog-post-thumbnail">
        <Img fluid={thumbnail} objectFit="contain" objectPosition="50% 50%" />
      </div>
      <div className="blog-post-body">
        <h2>{story.name}</h2>
        <EllipsisText text={blocksToText(story.content.body)} />
        <Link to={`/${story.full_slug}`}>Read more</Link>
      </div>
    </div>
  )
}

const BlogBrowserFooter = ({ page, maxPage, setPage }) => {
  const pageButtons = []
  for (var i = 1; i <= maxPage; i++) {
    pageButtons.push(i)
  }

  const PageButton = ({ text, to, enabled }) => {
    return (
      <button
        className="blog-browser-page-button"
        onClick={() => {
          if (to >= 1 && to <= maxPage && to !== page) {
            setPage(to)
          }
        }}
        disabled={!enabled}
      >
        {text}
      </button>
    )
  }

  return maxPage > 1 ? (
    <div className="blog-browser-footer">
      <PageButton text="<" to={page - 1} enabled={page !== 1} />
      {pageButtons.map(i => (
        <PageButton key={i} text={i} to={i} enabled={true} />
      ))}
      <PageButton text=">" to={page + 1} enabled={page !== maxPage} />
    </div>
  ) : null
}

export default ({ blok }) => {
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)

  useEffect(() => {
    async function getStories() {
      const stories = await Storyblok.get("cdn/stories", {
        starts_with: blok.source_path.story.full_slug,
        is_startpage: 0,
        page: page,
        per_page: 2,
      })
      const total = stories.headers.total
      setMaxPage(Math.ceil(stories.headers.total / stories.headers["per-page"]))
      setPosts(stories.data.stories)
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
          {posts.map(post => (
            <BlogPost key={i++} story={post} />
          ))}
          {posts.map(post => (
            <BlogPost key={i++} story={post} />
          ))}
        </div>
        <BlogBrowserFooter page={page} maxPage={maxPage} setPage={setPage} />
      </div>
    </SbEditable>
  )
}

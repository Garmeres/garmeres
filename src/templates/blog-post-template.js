import React from "react"
import Page from "../components/Page"
import Layout from "../layout/layout"
import { graphql } from "gatsby"
import StoryblokService from "../utils/storyblok-service"
import "../style/blog-post.css"
import SEO from "../components/seo"
import { getSeoFromStory } from "../utils/seo-helper"
import Featured from "../components/featured/Featured"

const BlogPostFeatured = ({
  _uid,
  image,
  color,
  backgroundColor,
  objectFit,
  overlayColor,
  overlayOpacity,
}) =>
  image != null && image.filename != null && image.filename !== "" ? (
    <Featured
      blok={{
        _uid,
        background_image: image,
        overlay_color: {
          color: overlayColor,
        },
        overlay_opacity: overlayOpacity,
        text_color: {
          color: color,
        },
        background_color: {
          color: backgroundColor,
        },
        object_fit: objectFit,
        body: [],
      }}
      color={color}
      backgroundColor={backgroundColor}
      objectFit={objectFit}
    />
  ) : null

BlogPostFeatured.defaultProps = {
  _uid: null,
  image: null,
  color: "#FFFFFF",
  backgroundColor: "#000000",
  overlayColor: "#000000",
  overlayOpacity: 0,
  objectFit: "100%",
}

class PageTemplate extends React.Component {
  state = {
    story: {
      content: this.props.data.story
        ? JSON.parse(this.props.data.story.content)
        : {},
    },
    storySeo: {},
  }

  async getInitialStory() {
    StoryblokService.setQuery(this.props.location.search)
    let {
      data: { story },
    } = await StoryblokService.get(
      `cdn/stories/${this.props.data.story.full_slug}`
    )
    return story
  }

  async componentDidMount() {
    let story = await this.getInitialStory()
    if (story.content) {
      this.setState({ story })
      if (story.content.component === "blog-post") {
        const title = this.props.data.story.title
        this.setState({
          heading: {
            title:
              title != null && title != "" ? title : this.props.data.story.name,
            published_at: story.first_published_at,
            tags: story.tag_list,
            author: story.content.author,
          },
        })
      }
    }
    setTimeout(() => StoryblokService.initEditor(this), 200)
  }

  render() {
    const storySeo = getSeoFromStory({
      ...this.props.data.story,
      content: JSON.parse(this.props.data.story.content),
    })

    const content = this.state.story.content

    return (
      <Layout
        location={this.props.location}
        siblings={this.props.data.siblings}
        lang={this.props.data.story.lang}
        footer={this.props.data.footer}
      >
        <SEO
          content={JSON.parse(this.props.data.seo.content).seo}
          lang={storySeo.lang}
          description={storySeo.description}
          title={storySeo.title}
          image={storySeo.image}
          imageAlt={storySeo.imageAlt}
          url={this.props.location.href}
        />
        <BlogPostFeatured
          _uid={this.state.story._uid}
          image={content.thumbnail}
          backgroundColor={content.background_color?.color}
          color={content.text_color?.color}
          objectFit={content.object_fit}
        />
        <Page blok={this.state.story.content} heading={this.state.heading} />
      </Layout>
    )
  }
}

export const query = graphql`
  query BlogPost(
    $nodeId: String
    $uuid: String
    $footerId: String
    $seoId: String
  ) {
    story: storyblokEntry(id: { eq: $nodeId }) {
      name
      content
      full_slug
      uuid
      lang
      title
      translated_slugs {
        path
        name
      }
    }
    footer: storyblokEntry(id: { eq: $footerId }) {
      name
      content
      full_slug
      uuid
      lang
    }

    seo: storyblokEntry(id: { eq: $seoId }) {
      name
      content
      full_slug
      uuid
      lang
    }

    siblings: allStoryblokEntry(filter: { uuid: { eq: $uuid } }) {
      edges {
        node {
          id
          lang
          slug
          full_slug
          uuid
        }
      }
    }
  }
`

export default PageTemplate

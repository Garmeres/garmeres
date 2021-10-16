import React from "react"
import Page from "../components/Page"
import Layout from "../layout/layout"
import { graphql } from "gatsby"
import StoryblokService from "../utils/storyblok-service"
import "../style/blog-post.css"
import Seo from "../components/seo"
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
      ...this.props.data.story,
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
      `cdn/stories/${this.props.data.story.default_full_slug}`,
      {
        language: this.props.data.story.lang,
      }
    )
    return story
  }

  componentDidMount() {
    this.getInitialStory().then(story => {
      if (story.content) {
        this.setState({
          story: {
            ...this.props.data.story,
            ...story,
          },
        })
      }
    })

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
        <Seo
          content={JSON.parse(this.props.data.seo.content).seo}
          lang={storySeo.lang}
          description={storySeo.description}
          title={storySeo.title}
          image={storySeo.image}
          imageAlt={storySeo.imageAlt}
          url={this.props.location.href}
          altVersions={this.props.data.story.alternate_versions}
        />
        <BlogPostFeatured
          _uid={this.state.story._uid}
          image={content.thumbnail}
          backgroundColor={content.background_color?.color}
          color={content.text_color?.color}
          objectFit={content.object_fit}
        />
        <Page
          blok={this.state.story.content}
          heading={{
            title:
              this.state.story.title != null
                ? this.state.story.title
                : this.state.story.name,
            author: this.state.story.content.author,
            published_at: this.state.story.first_published_at,
          }}
        />
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
      default_full_slug
      uuid
      lang
      title
      field_author_string
      first_published_at
      translated_slugs {
        path
        name
      }
      alternate_versions {
        lang
        language_code
        full_slug
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

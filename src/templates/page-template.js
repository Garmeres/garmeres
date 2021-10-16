import React from "react"
import Page from "../components/Page"
import Layout from "../layout/layout"
import { graphql } from "gatsby"
import StoryblokService from "../utils/storyblok-service"
import Seo from "../components/seo"
import { blocksToText } from "../utils/blocks-to-text"

class PageTemplate extends React.Component {
  state = {
    story: {
      content: this.props.data.story
        ? JSON.parse(this.props.data.story.content)
        : {},
    },
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
      if (story.content) this.setState({ story })
    })

    setTimeout(() => StoryblokService.initEditor(this), 200)
  }

  render() {
    return (
      <Layout
        location={this.props.location}
        siblings={this.props.data.siblings}
        lang={this.props.data.story.lang}
        footer={this.props.data.footer}
      >
        <Seo
          content={JSON.parse(this.props.data.seo.content).seo}
          lang={this.props.data.story.lang}
          title={this.props.data.story.title}
          description={blocksToText(
            JSON.parse(this.props.data.story.content).body,
            120
          )}
        />
        <Page blok={this.state.story.content} />
      </Layout>
    )
  }
}

export const query = graphql`
  query Page(
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

import React from "react"
import Page from "../components/Page"
import Layout from "../layout/index"
import { graphql } from "gatsby"
import StoryblokService from "../utils/storyblok-service"
import SEO from "../components/seo"

export default class IndexPage extends React.Component {
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
      `cdn/stories/${this.props.data.story.full_slug}`
    )
    return story
  }

  async componentDidMount() {
    let story = await this.getInitialStory()
    if (story.content) this.setState({ story })
    setTimeout(() => StoryblokService.initEditor(this), 200)
  }

  render() {
    return (
      <Layout location={this.props.location} lang="default">
        <SEO
          content={JSON.parse(this.props.data.seo.content).seo}
          lang="default"
        />
        <Page blok={this.state.story.content} />
      </Layout>
    )
  }
}

export const query = graphql`
  {
    story: storyblokEntry(full_slug: { eq: "index" }) {
      name
      content
      full_slug
      uuid
    }
    settings: allStoryblokEntry(filter: { name: { eq: "Language label" } }) {
      edges {
        node {
          id
          lang
          content
        }
      }
    }
    seo: storyblokEntry(
      lang: { eq: "default" }
      field_component: { eq: "site_seo" }
    ) {
      name
      content
      full_slug
      uuid
    }
  }
`

import React from "react"
import Page from "../components/Page"
import Layout from "../layout/layout"
import StoryblokService from "../utils/storyblok-service"

export default class NotFoundPage extends React.Component {
  state = {
    story: {
      lang: "default",
      content: null,
    },
  }

  async getInitialStory() {
    const { pathname } = this.props.location
    let {
      data: { story },
    } = await StoryblokService.get(`cdn/stories/${pathname}`)
    return story
  }

  async componentDidMount() {
    let story = await this.getInitialStory()
    if (story.content != null) {
      this.setState({ story })
    }
    StoryblokService.initEditor(this)
  }

  render() {
    let content =
      this.state.story.content != null ? (
        <Page blok={this.state.story.content} />
      ) : (
        <h1>Not found</h1>
      )
    return (
      <Layout location={this.props.location} lang={this.state.story.lang}>
        {content}
      </Layout>
    )
  }
}

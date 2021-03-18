/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    query mainQuery {
      stories: allStoryblokEntry(filter: { name: { eq: "Home" } }) {
        edges {
          node {
            id
            full_slug
            lang
            uuid
          }
        }
      }
    }
  `)

  const homeComponent = path.resolve(`./src/templates/home.js`)
  result.data.stories.edges.forEach(({ node }) => {
    createPage({
      path: node.full_slug,
      component: homeComponent,
      context: {
        nodeId: node.id,
        uuid: node.uuid,
      },
    })
    createPage({
      path: node.lang == "default" ? "en" : node.lang,
      component: homeComponent,
      context: {
        nodeId: node.id,
        uuid: node.uuid,
      },
    })
  })

  return new Promise((resolve, reject) => {
        createPage({
          path: `/editor`,
          component: path.resolve('src/pages/editor.js')
        })
}

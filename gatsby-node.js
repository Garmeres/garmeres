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
      stories: allStoryblokEntry(filter: { field_component: { eq: "page" } }) {
        edges {
          node {
            id
            full_slug
            lang
            uuid
          }
        }
      }
      homePages: allStoryblokEntry(filter: { name: { eq: "Home" } }) {
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

  const pageTemplate = path.resolve(`./src/templates/page-template.js`)

  result.data.stories.edges
    .filter(({ node }) => node.full_slug !== "/")
    .map(({ node }) => {
      createPage({
        path: node.full_slug,
        component: pageTemplate,
        context: {
          nodeId: node.id,
          uuid: node.uuid,
        },
      })
    })

  result.data.homePages.edges.map(({ node }) => {
    createPage({
      path: node.lang != "default" ? node.lang : "en",
      component: pageTemplate,
      context: {
        nodeId: node.id,
        uuid: node.uuid,
      },
    })
  })
}

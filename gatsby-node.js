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
      blogPosts: allStoryblokEntry(
        filter: { field_component: { eq: "blog-post" } }
      ) {
        edges {
          node {
            id
            full_slug
            lang
            uuid
          }
        }
      }
      footers: allStoryblokEntry(
        filter: { field_component: { eq: "footer" } }
      ) {
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
      seo: allStoryblokEntry(filter: { field_component: { eq: "site_seo" } }) {
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

  const footers = {}
  result.data.footers.edges.map(({ node }) => {
    footers[node.lang] = node.id
  })

  const seo = {}
  result.data.seo.edges.map(({ node }) => {
    seo[node.lang] = node.id
  })

  const pageTemplate = path.resolve(`./src/templates/page-template.js`)
  const blogPostTemplate = path.resolve(`./src/templates/blog-post-template.js`)

  result.data.stories.edges
    .filter(({ node }) => node.full_slug !== "/" && node.full_slug != "index")
    .map(({ node }) => {
      createPage({
        path: node.full_slug,
        component: pageTemplate,
        context: {
          nodeId: node.id,
          uuid: node.uuid,
          footerId: footers[node.lang],
          seoId: seo[node.lang],
        },
      })
    })

  result.data.blogPosts.edges.map(({ node }) => {
    createPage({
      path: node.full_slug,
      component: blogPostTemplate,
      context: {
        nodeId: node.id,
        uuid: node.uuid,
        footerId: footers[node.lang],
        seoId: seo[node.lang],
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
        seoId: seo[node.lang],
      },
    })
  })
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type MenuItem {
      name: String!
      full_slug: String!
    }

    type MenuData implements Node {
      lang: String!
      pageIds: [String]!
      menuItems: [MenuItem]!
    }

    type StoryblokEntry implements Node {
      title: String
    }
  `
  createTypes(typeDefs)
}

exports.onCreateNode = ({
  node,
  createNodeId,
  createContentDigest,
  actions,
}) => {
  const { createNode } = actions

  if (node.field_component === "menu") {
    const nodeData = {
      key: node.id,
      lang: node.lang,
      pageIds: JSON.parse(node.content).items.map(item => item.page),
    }
    const nodeContent = JSON.stringify(nodeData)
    const nodeMeta = {
      id: createNodeId(`menu-data-${nodeData.key}`),
      parent: node.id,
      children: [],
      internal: {
        type: "MenuData",
        content: nodeContent,
        contentDigest: createContentDigest(nodeData),
      },
    }
    createNode(Object.assign({}, nodeData, nodeMeta))
  }
}

const resolveMenuItems = (source, context) => {
  return source.pageIds.map(pageId =>
    context.nodeModel
      .runQuery({
        query: {
          filter: {
            uuid: {
              eq: pageId,
            },
            lang: {
              eq: source.lang,
            },
          },
        },
        type: "StoryblokEntry",
        firstOnly: true,
      })
      .then(pageNode => {
        if (pageNode != null) {
          const translated = pageNode.translated_slugs.find(
            ({ lang }) => lang == source.lang
          )
          return {
            name:
              translated != null && translated.name != null
                ? translated.name
                : pageNode.name,
            full_slug: pageNode.full_slug,
          }
        } else return null
      })
  )
}

exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {
    MenuData: {
      menuItems: {
        resolve: (source, args, context, info) => {
          return resolveMenuItems(source, context)
        },
      },
    },
    StoryblokEntry: {
      title: {
        resolve: (source, args, context, info) => {
          var result = source.name

          var translated = source.translated_slugs.find(
            item => item.lang === source.lang
          )

          if (translated != null) {
            result = translated.name
          }

          return result
        },
      },
    },
  }
  createResolvers(resolvers)
}

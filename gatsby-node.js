/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');

// You can delete this file if you're not using it

exports.createPages = async ({ actions, graphql }) => {
    const result = await graphql(`
        query MyQuery {
            allSanityPages {
                edges {
                    node {
                        slug {
                        current
                        }
                    }
                }
            }
        }
    `);

    const projects = result.data.allSanityPages.edges.map(({ node }) => node );

    projects.forEach(project => {
        actions.createPage({
            path: project.slug.current,
            component: path.resolve('./src/templates/page.js'),
            context: {
                slug: project.slug.current
            }
        })
    })
}



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
                        pagetype{
                            pagetype
                        }
                    }
                }
            }
        }
    `);

    const projects = result.data.allSanityPages.edges.map(({ node }) => node );
    projects.forEach(project => {
        if(project.slug.current == "our-services"){
            actions.createPage({
                path: project.slug.current,
                component: path.resolve('./src/templates/ourServices.js'),
                context: {
                    slug: project.slug.current
                }
            })
        } else if (project.slug.current == "coupons"){
                 actions.createPage({
                    path: project.slug.current,
                    component: path.resolve('./src/templates/coupons.js'),
                    context: {
                        slug: project.slug.current
                    }
                })
        } else if (project.slug.current == "reviews") {
            actions.createPage({
                path: project.slug.current,
                component: path.resolve('./src/templates/reviews.js'),
                context: {
                    slug: project.slug.current
                }
            })
        } else if (project.pagetype.pagetype == "Service Page") {
            actions.createPage({
                path: project.slug.current,
                component: path.resolve('./src/templates/servicepage.js'),
                context: {
                    slug: project.slug.current
                }
            })
        } else {
            actions.createPage({
                path: project.slug.current,
                component: path.resolve('./src/templates/page.js'),
                context: {
                    slug: project.slug.current
                }
            })
        }
    })
}



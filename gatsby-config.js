module.exports = {
  siteMetadata: {
    title: `PPC Automated Pages`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: '9xo0vpil',
        dataset: 'production', 
        overlayDrafts: true,
        watchMode: true,
      }
    },
    // {
    //   resolve: `gatsby-plugin-manifest`,
    //   options: {
    //     name: `gatsby-starter-default`,
    //     short_name: `starter`,
    //     start_url: `/`,
    //     //background_color: `#663399`,
    //     //theme_color: `#663399`,
    //     display: `standalone`,
    //     //icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
    //   },
    // },
  `gatsby-plugin-styled-components`,
  `gatsby-plugin-netlify`,
  {
    resolve: `gatsby-plugin-netlify`,
    options: {
      headers: {
        "/*": [
          `Referrer-Policy: strict-origin-when-cross-origin`,
        ],
      }
    }
  }
  ],
}

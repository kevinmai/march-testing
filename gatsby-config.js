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
        projectId: 'mg8wb33w',
        dataset: 'production', 
        overlayDrafts: true,
        watchMode: true,
        token: 'sktnCRevILcYrRD3kqsDwrmmyfs5i2wSUcLBQNCgtB56huJORRPPbgAc1IGozgfov356BMJDvZh1j76KRwG0J06WtRG6UVm9B85Rad5kRw7K16p8ETmjKMmlRrcR6EO2Bu1vzsDb42OlnkvTLe82rVXoeFkvvcaVuGClqz3T7NXnJzLArVnU'
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
  `gatsby-plugin-netlify`
  ],
}

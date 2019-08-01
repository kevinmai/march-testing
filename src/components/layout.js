/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./header"
import PageHeader from "./pageHeader"
import Form from "./form"
import "./layout.css"
import { FaCalendarAlt } from 'react-icons/fa'
import $ from "jquery"
import BackgroundImage from 'gatsby-background-image'

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery($slug: String) {
      site {
        siteMetadata {
          title
        }
      }
      sanityCompanyInfo {
        primarycolor
        secondarycolor
        accentcolor
      }
      sanityPages(slug: {current: {eq: $slug}}) {
            pagetitle
            slug{
              current
            }
            coupon{
              title
              type
            }
            serviceimage{
                asset{
                    fluid(maxWidth: 1920){
                        ...GatsbySanityImageFluid
                        src
                    }
                }
            }
            headerimage{
                asset{
                    fluid(maxWidth: 1920){
                        ...GatsbySanityImageFluid
                        src
                    }
                }
            }
        }
    }
  `)


  function changeActive() {
    $(".form").toggleClass("expanded");
    console.log("click");
  }

  return (
    <>
    <div className="pagewrapper">
      <Header siteTitle={data.site.siteMetadata.title} />

      <Form />
        <div>
          <main>{children}</main>
          <div className="scheduleMobile" onClick={changeActive} style={{backgroundColor: "#" + data.sanityCompanyInfo.primarycolor}}>
              <div className="innerSchedule">
                <FaCalendarAlt /> <span>Schedule Service</span>
              </div>
            </div>
          <footer>
            <div className="container">
              <p>{data.site.siteMetadata.title} | Marketing by <a href="http://vitalstorm.com/" target="_blank" rel="noopener noreferrer">Vital Storm Marketing Inc.</a></p> 
            </div>
          </footer>
        </div>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}


export default Layout

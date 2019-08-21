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
import Helmet from 'react-helmet'
//import Form from "./form"
import "./layout.css"
import { FaCalendarAlt } from 'react-icons/fa'
import $ from "jquery"

const Layout = ({ children }) => {
  
  const data = useStaticQuery(graphql`
    query SiteTitleQuery($slug: String) {
      site {
        siteMetadata {
          title
        }
      }
      sanityCompanyInfo {
        companyname
        logo{
          asset{
            fluid{
              ...GatsbySanityImageFluid
              src
            }
          }
        }
        primarycolor
        secondarycolor
        accentcolor
        analytics{
          code
        }
        marchex
        clicky
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

  

console.log("hello");
  
  return (
    <>
    
    <Helmet>
        <link rel="icon"
          type="image/png"
          href={data.sanityCompanyInfo.logo.asset.fluid.src} />
        
        <meta name="robots" content="noindex, nofollow" />
    </Helmet>
    <div className="pagewrapper">
      <Header siteTitle={data.site.siteMetadata.title} />
          <div>
            <main>{children}</main>
            <div className="scheduleMobile" onClick={changeActive} style={{backgroundColor: data.sanityCompanyInfo.secondarycolor}}>
                <div className="innerSchedule">
                  <FaCalendarAlt /> <span>Schedule Service</span>
                </div>
              </div>
            <footer>
              <div className="container">
                <p>{data.site.siteMetadata.title} | Marketing by <a href="http://vitalstorm.com/" target="_blank" rel="noopener noreferrer">Vital Storm Marketing Inc.</a></p> 
              </div>
              <script>{` 
              console.log({data.sanityCompanyInfo.analytics.code});
              `}  </script>
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

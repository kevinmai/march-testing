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
        favicon{
          asset{
            fluid{
              ...GatsbySanityImageFluid
              src
            }
          }
        }
        primarycolor{
          hex
      }
      secondarycolor{
          hex
      }
      accentcolor{
          hex
      }
        analytics
        marchex
        clicky
        remarketing
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
  }  

  return (
    <>
    
    <Helmet>
          <link rel="icon"
          type="image/png"
          href={data.sanityCompanyInfo.favicon.asset.fluid.src} defer="false" />
        
        <meta name="robots" content="noindex, nofollow" />

        {data.sanityCompanyInfo.analytics ? (
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${data.sanityCompanyInfo.analytics}`}/> 
          
          ) : null}

          {data.sanityCompanyInfo.analytics ? (
              <script>
                {`window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                        
                  gtag('config', '${data.sanityCompanyInfo.analytics}');
                `}
              </script>
            ) : null}

          {data.sanityCompanyInfo.remarketing ? (
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${data.sanityCompanyInfo.remarketing}`}/> ) : null}

          {data.sanityCompanyInfo.remarketing ? (
            <script>{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${data.sanityCompanyInfo.remarketing}');
            `}
          </script>

          ) : null}
          
          {data.sanityCompanyInfo.remarketing ? (
              <script>{`
              gtag('event', 'page_view', {
                'send_to': '${data.sanityCompanyInfo.remarketing}',
                'user_id': 'replace with value'
              });
              `}
              </script>
          ) : null}
    </Helmet>
    <div className="pagewrapper">
      <Header siteTitle={data.site.siteMetadata.title} />
          <div>
            <main>{children}</main>
            <div className="scheduleMobile" onClick={changeActive} style={{backgroundColor: data.sanityCompanyInfo.secondarycolor.hex}}>
                <div className="innerSchedule">
                  <FaCalendarAlt /> <span>Schedule Service</span>
                </div>
              </div>
            <footer className="footer">
              <div className="container">
                <p>{data.sanityCompanyInfo.companyname} | Marketing by <a href="http://vitalstorm.com/" target="_blank" rel="noopener noreferrer">VitalStorm</a></p> 
              </div>
              <script type="text/javascript">
                {/*`var SETUP_VS_LP = function(){
                    INIT_VS_LP({
                        env: 'prod'
                    });
                };`*/}
					    </script>
					    {/* <script src="https://s3.amazonaws.com/vs.static-files/vs_lp_conv_bundle.js"  async defer onLoad={`SETUP_VS_LP`}></script> */}
              
              
              <script type="text/javascript">{`
                vs_account_id      = '${data.sanityCompanyInfo.marchex}';
              `}</script>
              <script type="text/javascript" src="https://rw1.calls.net/euinc/number-changer.js">
              </script>

              <script>{`var clicky_site_ids = clicky_site_ids || []; clicky_site_ids.push(${data.sanityCompanyInfo.clicky});`}</script>
              <script async src="//static.getclicky.com/js"></script>

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

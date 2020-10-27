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
import Image from "gatsby-image"
import "./layout.css"
import { FaCalendarAlt, FaPhone } from 'react-icons/fa'
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
        phone
        licenses
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
      allSanityBadges{
        edges {
          node {
            badge_img {
              asset {
                fluid {
                  src
                }
              }
            }
            badge_name
          }
        }
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


  function changeActive(){
    $(".form").toggleClass("expanded");
    $('body').toggleClass('formExpanded');
  }  

/* REPLACE COMPANYNAME IN COPY */
function getUrlVars(){
  var vars = [], hash;
  if(typeof window !== 'undefined'){
      var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
      for(var i = 0; i < hashes.length; i++)
      {
          hash = hashes[i].split('=');
          vars.push(hash[0]);
          vars[hash[0]] = hash[1];
      }
  }
  return vars;
}
if(typeof window !== 'undefined'){
    $(window).on('load', function(){
      $('div.pageContent a').attr('href', function(i, href){
        city= getUrlVars()['city'];
    });
    var city = getUrlVars()["city"];
    if(city !== 'undefined'){
      $("p").each(function(){
          var text = $(this).text();
          text = text.replace("[city]", city);
          $(this).html(text); 
        });
    }  else {
      $("p").each(function(){
        var text = $(this).text();
        text = text.replace("[city]", "");
        $(this).html(text); 
        });
    }
});
}

  return (
    <>
    
    <Helmet>
          <link rel="icon"
          type="image/png"
          href={data.sanityCompanyInfo.favicon.asset.fluid.src} defer="false" />
         <script
    src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossOrigin="anonymous" />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="twitter:card" content="summary" />

        <meta property="og:image" content={data.sanityPages.headerimage.asset.fluid.src} />
        <meta property="og:title" content={data.sanityCompanyInfo.companyname + " | " + data.sanityPages.pagetitle} />

        {data.sanityCompanyInfo.analytics ? (
          <script async className="AnalyticsCode" src={`https://www.googletagmanager.com/gtag/js?id=${data.sanityCompanyInfo.analytics}`}/> 
          
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
          <script async className="RemarketingCode" src={`https://www.googletagmanager.com/gtag/js?id=${data.sanityCompanyInfo.remarketing}`}/> ) : null}

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


          <script>
            {`
              /***** ADD CITY TO URLS IN PAGE *****/
              function addCity(){
                if(typeof window !== 'undefined'){
                    $('div.pageContent a').attr('href', function(i, href){
                        city= getUrlVars()['city'];
                        return href + "?city=" +  city; 
                    });
                }  
              }
            `}
          </script>

          <script>{`
            /* SINGLE COUPON PRINT */
            $(".couponsRow .coupon").each(function(){
              $(this).click(function(){
                  if(typeof window !== 'undefined'){
                      var printContents = $(this).wrap('<p/>').parent().html();
                      var originalContents = document.body.innerHTML;
                      document.body.innerHTML = "${data.sanityCompanyInfo.logo.asset.fluid.src}";
                      document.body.innerHTML = printContents;
            
                      window.print();
                      document.body.innerHTML = originalContents;
                  }

              });
            });
          `}</script>
          <meta name="theme-color" content={data.sanityCompanyInfo.secondarycolor.hex} />
          <script type="text/javascript">
                {`var SETUP_VS_LP = function(){
                    INIT_VS_LP({
                        env: 'prod'
                    });
                };`}
					    </script>
					    <script src="https://s3.amazonaws.com/vs.static-files/vs_lp_conv_bundle.js"  async defer onLoad={`SETUP_VS_LP`}></script>
              
              
              <script type="text/javascript">{`
                vs_account_id      = "${data.sanityCompanyInfo.marchex}";
              `}</script>
              <script type="text/javascript" src="https://rw1.calls.net/euinc/number-changer.js"></script>

              <script>{`var clicky_site_ids = clicky_site_ids || []; clicky_site_ids.push(${data.sanityCompanyInfo.clicky});`}</script>
              <script async src="//static.getclicky.com/js"></script>
              <script src="https://kit.fontawesome.com/4ab4233178.js" crossorigin="anonymous"></script>

    </Helmet>
    <div className="pagewrapper">
      <Header siteTitle={data.site.siteMetadata.title} />
          <div>
            <main>{children}</main>
            <div className="scheduleMobile" >
                <div className="innerSchedule" onClick={changeActive} style={{backgroundColor: data.sanityCompanyInfo.secondarycolor.hex}}>
                  <FaCalendarAlt /> <span>Schedule</span>
                </div>
                <a href={'tel:' + data.sanityCompanyInfo.phone } className="innerPhone" style={{backgroundColor: data.sanityCompanyInfo.accentcolor.hex}}>
                  <FaPhone /> <span>Call now</span>
                </a>
              </div>
            <footer className="footer">
              <div className="badgeBanner">
                  <div className="columns">
                  
                    <div className="badges">

                    {data.allSanityBadges.edges.map(({ node: badge }) => (
                              <Image fluid={badge.badge_img.asset.fluid} key={badge.badge_name}/>
                          ))}
                        
                    </div>
                    
                  
                  </div>
                </div>
              <div className="container">
              <div className="licenses">
                  {data.sanityCompanyInfo.licenses.map(( license  => 
                    <div>{license}</div>
                  ))}
              </div>
                <p>&copy; {data.sanityCompanyInfo.companyname} | Marketing by <a href="http://vitalstorm.com/" target="_blank" rel="noopener noreferrer">VitalStorm Marketing Inc.</a></p> 
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

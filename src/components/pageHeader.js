import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { FaPrint } from "react-icons/fa"
import BackgroundImage from 'gatsby-background-image'
import $ from 'jquery'
/* PRINT COUPON */
function printCoupon() {
    if(typeof window !== 'undefined'){
      window.print();
  }
  }
//import BackgroundImage from 'gatsby-background-image'

const now = new Date();
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const today = days[now.getDay()];

function changeActive(){
    $(".form").toggleClass("expanded");
  }

export default () => (
<StaticQuery query={ graphql`
    query pageheaderquery($slug: String) {
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
        sanityCompanyInfo {
            primarycolor{
                hex
            }
            secondarycolor{
                hex
            }
            accentcolor{
                hex
            }
        }
    }
`}


render={ data => (
    
    <BackgroundImage
    style={{
      height: "100%",
      backgroundPosition: "center"
    }}
    fluid={data.sanityPages.headerimage.asset.fluid}>

    <div className="pageHeader">
      <div className="innerLeft">
        <div className="pgHeaderBackground" style={{
            backgroundColor: data.sanityCompanyInfo.primarycolor.hex,
            opacity: "0.9"
        }}></div>
        <p className="day">Schedule This <b style={{color: data.sanityCompanyInfo.accentcolor.hex}}>{today}</b> for </p>
        <p className="coupon">{data.sanityPages.coupon.title}</p>
        <p className="couponType">{data.sanityPages.coupon.type}</p>
        <div className="schedulebtn-container">
          <span className="schedulebtn" style={{backgroundColor: data.sanityCompanyInfo.accentcolor.hex}} onClick={changeActive}>Schedule</span>
          <span className="printCoupon" onClick={printCoupon} style={{ backgroundColor: data.sanityCompanyInfo.accentcolor.hex }}><FaPrint /> <span className="mobileCouponText">Claim Offer</span></span>
        </div>
        <p className="restrictions">*Restrictions may apply</p>
      </div>
    </div>
  </BackgroundImage>
    
    )}
/>
)

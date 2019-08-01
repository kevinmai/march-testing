import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { FaPrint } from "react-icons/fa"
//import BackgroundImage from 'gatsby-background-image'

const now = new Date();
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const today = days[now.getDay()];

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
            primarycolor
            secondarycolor
            accentcolor
        }
    }
`}


render={ data => (
    
            <div className="pageHeader">
                <div className="innerLeft">
                    <h1>{data.sanityPages.pagetitle}</h1>
                    <p>Call This <b>{today}</b> for </p>
                    <p className="coupon">{data.sanityPages.coupon.title} {data.sanityPages.coupon.type}</p>
                    <p className="restrictions">*Restrictions may apply</p>
                    <span className="printCoupon" style={{backgroundColor: "#" + data.sanityCompanyInfo.accentcolor}}><FaPrint /> <span className="mobileCouponText">Claim Offer</span></span>
                </div>
 
            </div>
    
    )}
/>
)

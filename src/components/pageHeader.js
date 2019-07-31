import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { FaPrint } from "react-icons/fa"

const now = new Date();
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const today = days[now.getDay()];

export default () => (
<StaticQuery query={ graphql`
    query pageheaderquery {
        sanityPages(slug: {current: {eq: "our-services"}}) {
            pagetitle
            slug{
              current
            }
            _rawFirstcopy
            _rawServices
            _rawSecondcopy
            coupon{
              title
              type
            }
            serviceimage{
                asset{
                    fluid{
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

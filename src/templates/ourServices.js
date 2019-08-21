import React from 'react';
import { graphql } from 'gatsby';
import Layout from "../components/layout"
import Helmet from 'react-helmet'
import { Link } from "gatsby"
import BlockContent from '../components/block-content'
import BackgroundImage from 'gatsby-background-image'
import { FaPrint } from "react-icons/fa"
import Form from "../components/form"

import PortableText from '@sanity/block-content-to-react'


export const query = graphql`
    query ourservicespageQuery {
        sanityPages(slug: {current: {eq: "our-services"}}) {
            pagetitle
            slug {
                current
            }
            _rawFirstcopy(resolveReferences: { maxDepth: 10 })
            firstcopy {
            sanityChildren {
                marks
                text
                _type
                _key
            }
            list
            _type
            _key
            style
            }
            _rawServices
            _rawSecondcopy
            coupon {
                title
                type
            }
            headerimage {
                asset {
                    fluid(maxWidth: 1920) {
                        ...GatsbySanityImageFluid
                    }
                }
            }
            serviceimage {
                asset {
                    fluid(maxWidth: 1920) {
                      ...GatsbySanityImageFluid
                    }
                }
            }
        }
        sanityCompanyInfo {
            companyname
            primarycolor
            secondarycolor
            accentcolor
        }
    }
`

const now = new Date();
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const today = days[now.getDay()];

function printCoupon() {
    window.print();
  }


const serializers = {
  marks: {
      internalLink: ({mark, children}) => {
          const {slug = {}} = mark
          const href = `/${slug.current}`
          return <Link to={href}>{children}</Link>
        }
    }
}
console.log(serializers);
export default ({ data }) => (
    <Layout>
        <Helmet>
            <title>{data.sanityCompanyInfo.companyname} | {data.sanityPages.pagetitle}</title>
        </Helmet>
        <Form />
        
        <BackgroundImage
            style={{
                height: "100%",
                backgroundPosition: "center"
            }}
            fluid={data.sanityPages.headerimage.asset.fluid}>

            <div className="pageHeader">
                <div className="innerLeft" >
                    <div className="pgHeaderBackground" style={{
                        backgroundColor: data.sanityCompanyInfo.primarycolor,
                        opacity: "0.9"
                    }}></div>

                    <h1 style={{ borderColor: data.sanityCompanyInfo.accentcolor }}>{data.sanityPages.pagetitle}</h1>
                    <p>Call This <b style={{color: data.sanityCompanyInfo.accentcolor}}>{today}</b> for </p>
                    <p className="coupon">{data.sanityPages.coupon.title}</p>
                    <p className="couponType">{data.sanityPages.coupon.type}</p>
                    <p className="restrictions">*Restrictions may apply</p>
                    <span className="printCoupon" onClick={printCoupon} style={{ backgroundColor: data.sanityCompanyInfo.accentcolor }}><FaPrint /> <span className="mobileCouponText">Claim Offer</span></span>
                </div>

            </div>
        </BackgroundImage>
        <Form />
        <div className="ourServicesPage">
            <div className="container pageContent ">
                <div className="row">
                    <PortableText blocks={data.sanityPages._rawFirstcopy} serializers={serializers} />
                </div>
            </div>
            <div className="row servicesRow">
                <div className="leftSection">
                    <BackgroundImage
                        style={{ height: "100%" }}
                        fluid={data.sanityPages.serviceimage.asset.fluid}>
                    </BackgroundImage>
                </div>
                <div className="rightSection" style={{ backgroundColor: data.sanityCompanyInfo.primarycolor }}>
                    <span className="rightSectionTitle"><h2>Our Services</h2></span>
                    <hr style={{ backgroundColor: data.sanityCompanyInfo.accentcolor }} />
                    <BlockContent blocks={data.sanityPages._rawServices} />
                </div>
            </div>
        </div>
    </Layout>
)

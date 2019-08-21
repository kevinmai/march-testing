import React from 'react';
import { graphql } from 'gatsby';
import Layout from "../components/layout"
import BlockContent from '../components/block-content'
import BackgroundImage from 'gatsby-background-image'
import { FaPrint } from "react-icons/fa"
import Form from "../components/form"
import Helmet from 'react-helmet'

export const query = graphql`
    query couponsQuery{
        sanityPages(slug: {current: {eq: "coupons"}}) {
            pagetitle
            slug {
                current
            }
            _rawFirstcopy
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
        allSanityCoupon{
            edges{
                node{
                    title
                    type
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

const CouponsPage = ({ data }) => (
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
                <div className="innerLeft">
                    <div className="pgHeaderBackground" style={{
                        backgroundColor: data.sanityCompanyInfo.primarycolor,
                        opacity: "0.9"
                    }}></div>
                    <h1 style={{ borderColor: data.sanityCompanyInfo.accentcolor }}>{data.sanityPages.pagetitle}</h1>
                    <p>Call This <b style={{color: data.sanityCompanyInfo.accentcolor}}>{today}</b> for </p>
                    <p className="coupon">{data.sanityPages.coupon.title}</p>
                    <p className="couponType">{data.sanityPages.coupon.type}</p>
                    <p className="restrictions">*Restrictions may apply</p>
                    <span className="printCoupon" style={{ backgroundColor: data.sanityCompanyInfo.accentcolor }}><FaPrint /> <span className="mobileCouponText">Claim Offer</span></span>
                </div>

            </div>
        </BackgroundImage>
        <div className="couponsPage">
            <div className="container pageContent">
                <div className="row">
                    <BlockContent blocks={data.sanityPages._rawFirstcopy} />
                </div>
                <div className="row couponsRow">
                    <ul>
                        {data.allSanityCoupon.edges.map(({ node: coupon }) => (
                            <li style={{ backgroundColor: data.sanityCompanyInfo.primarycolor }}>
                                <span className="couponTitle">{coupon.title}</span>
                                <br />
                                <span className="couponType">{coupon.type}</span>
                                <br />
                                <span className="restrictions">*Restrictions may apply. Call office for details.</span>
                            </li>
                        ))}
                    </ul>
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
                    <h2>Our Services</h2>
                    <BlockContent blocks={data.sanityPages._rawServices} />
                    <a href="/our-services" style={{ backgroundColor: data.sanityCompanyInfo.accentcolor }}>View our Services</a>
                </div>
            </div>
        </div>
    </Layout>
)

export default CouponsPage
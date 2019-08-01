import React from 'react';
import { graphql } from 'gatsby';
import Layout from "../components/layout"
import { FaStar } from "react-icons/fa"
import BlockContent from '../components/block-content'
import BackgroundImage from 'gatsby-background-image'
import { FaPrint } from "react-icons/fa"

export const query = graphql`
    query reviewsQuery {
        sanityPages(slug: {current: {eq: "reviews"}}) {
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
        sanityCompanyInfo {
            primarycolor
            secondarycolor
            accentcolor
        }
        allSanityReviews{
            edges{
                node{
                    review
                    author
                }
            }
        }
    }
`

const now = new Date();
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const today = days[now.getDay()];

export default ({ data }) => (
    <Layout>
        <BackgroundImage
            style={{
                height: "100%",
                backgroundPosition: "center"
            }}
            fluid={data.sanityPages.headerimage.asset.fluid}>

            <div className="pageHeader">
                <div className="innerLeft">
                    <h1>{data.sanityPages.pagetitle}</h1>
                    <p>Call This <b>{today}</b> for </p>
                    <p className="coupon">{data.sanityPages.coupon.title} {data.sanityPages.coupon.type}</p>
                    <p className="restrictions">*Restrictions may apply</p>
                    <span className="printCoupon" style={{ backgroundColor: "#" + data.sanityCompanyInfo.accentcolor }}><FaPrint /> <span className="mobileCouponText">Claim Offer</span></span>
                </div>

            </div>
        </BackgroundImage>
        <div class="container pageContent">
            <div class="row">
                <BlockContent blocks={data.sanityPages._rawFirstcopy} />
            </div>
        </div>
        <div class="container">
            <div class="row reviewRow">
                
                    {data.allSanityReviews.edges.map(({ node: reviews }) => (
                        <div class="review">
                            <FaStar style={{ color: "#" + data.sanityCompanyInfo.secondarycolor }} /><FaStar style={{ color: "#" + data.sanityCompanyInfo.secondarycolor }} /><FaStar style={{ color: "#" + data.sanityCompanyInfo.secondarycolor }} /><FaStar style={{ color: "#" + data.sanityCompanyInfo.secondarycolor }} /><FaStar style={{ color: "#" + data.sanityCompanyInfo.secondarycolor }} />
                            <p>{reviews.review}</p>
                            <p class="author"> - {reviews.author}</p>
                        </div>
                    ))}
                
            </div>
        </div>
        <div class="row servicesRow">
            <div class="leftSection">
                <BackgroundImage
                    style={{ height: "100%" }}
                    fluid={data.sanityPages.serviceimage.asset.fluid}>
                </BackgroundImage>
            </div>
            <div class="rightSection" style={{ backgroundColor: "#" + data.sanityCompanyInfo.secondarycolor }}>
                <h2>Our Services</h2>
                <BlockContent blocks={data.sanityPages._rawServices} />
                <a href="/our-services" style={{ backgroundColor: "#" + data.sanityCompanyInfo.accentcolor }}>View our Services</a>
            </div>
        </div>
        <div class="container pageContent">
            <div class="row">
                <BlockContent blocks={data.sanityPages._rawSecondcopy} />
            </div>
        </div>
    </Layout>
)
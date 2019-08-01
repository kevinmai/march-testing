import React from 'react';
import { graphql } from 'gatsby';
import Layout from "../components/layout"
import BlockContent from '../components/block-content'
import BackgroundImage from 'gatsby-background-image'

export const query = graphql`
    query couponsQuery{
        sanityPages(slug: {current: {eq: "coupons"}}) {
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
                    fluid(maxWidth:1000){
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
            primarycolor
            secondarycolor
            accentcolor
        }
    }

`

const CouponsPage = ({ data }) => (
    <Layout>
        <div class="container pageContent">
            <div class="row">
                <BlockContent blocks={data.sanityPages._rawFirstcopy} />
            </div>
            <div class="row couponsRow">
                <ul>
                    {data.allSanityCoupon.edges.map(({ node: coupon }) => (
                        <li style={{ backgroundColor: "#" + data.sanityCompanyInfo.secondarycolor }}>
                            <span class="couponTitle">{coupon.title}</span>
                            <br />
                            <span class="couponType">{coupon.type}</span>
                            <br />
                            <span class="restrictions">*Restrictions may apply. Call office for details.</span>
                        </li>
                    ))}
                </ul>
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
    </Layout>
)

export default CouponsPage
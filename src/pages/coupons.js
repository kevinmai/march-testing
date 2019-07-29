import React from 'react';
import { graphql } from 'gatsby';
import Layout from "../components/layout"
import { FaPrint } from "react-icons/fa"
import Image from "gatsby-image"
import BlockContent from '../components/block-content'


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

const now = new Date();
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const today = days[now.getDay()];

const CouponsPage = ({data}) => (
    <Layout>
        <div class="pageHeader">
            <div class="innerLeft">
                <h1>{data.sanityPages.pagetitle}</h1>
                <p>Call This <b>{today}</b> for </p>
                <p class="coupon">{data.sanityPages.coupon.title} {data.sanityPages.coupon.type}</p>
                <p class="restrictions">*Restrictions may apply</p>
                <span class="printCoupon"><FaPrint /></span>
            </div>
        </div>

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
                <Image fluid={data.sanityPages.serviceimage.asset.fluid} />
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
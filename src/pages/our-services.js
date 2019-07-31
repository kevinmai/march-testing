import React from 'react';
import { graphql } from 'gatsby';
import Layout from "../components/layout"
import { FaPrint } from "react-icons/fa"
import Image from "gatsby-image"
import BlockContent from '../components/block-content'

import BackgroundImage from 'gatsby-background-image'

export const query = graphql`
    query ourservicespagesQuery {
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
`
const now = new Date();
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const today = days[now.getDay()];


const IndexPage = ({ data }) => (
    <Layout>
        <div className="container pageContent">
            <div className="row">
                <BlockContent blocks={data.sanityPages._rawFirstcopy} />
            </div>
        </div>
        <div className="row servicesRow">
            <div className="leftSection">
                <BackgroundImage
                    style={{ height: "100%" }}
                    fluid={data.sanityPages.serviceimage.asset.fluid}>
                </BackgroundImage>
            </div>
            <div className="rightSection" style={{ backgroundColor: "#" + data.sanityCompanyInfo.secondarycolor }}>
                <h2>Our Services</h2>
                <BlockContent blocks={data.sanityPages._rawServices} />
            </div>
        </div>
    </Layout>
)

export default IndexPage

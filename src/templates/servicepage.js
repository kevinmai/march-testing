import React from 'react';
import { graphql } from 'gatsby';
import Layout from "../components/layout"
import BlockContent from '../components/block-content'
import BackgroundImage from 'gatsby-background-image'
import Helmet from 'react-helmet'

import ServiceForm from "../components/serviceForm"
import Form from "../components/form"

export const query = graphql`
    query servicepageQuery($slug: String) {
        sanityPages(slug: {current: {eq: $slug}}) {
            pagetitle
            pagetype{
                pagetype
            }
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
            metatags
            metadescription
    }
        sanityCompanyInfo {
            companyname
            primarycolor
            secondarycolor
            accentcolor
        }
    }
`


export default ({ data }) => (
<div className="servicePage">


        <Helmet>
            <title>{data.sanityCompanyInfo.companyname} | {data.sanityPages.pagetitle}</title>
            <meta name="keywords" content={ data.sanityPages.metatags }  />
            <meta name="description" content={data.sanityPages.metadescription} />
        </Helmet>
    <Layout>
            <div className="flexWrapper">
                <Form />
                <ServiceForm />
                <div className="pagewrap">
                <BackgroundImage
                    style={{
                        height: "100%",
                        backgroundPosition: "center",

                    }}
                    fluid={data.sanityPages.headerimage.asset.fluid}>

                    <div className="pageHeader">
                        <div className="overlay" style={{
                                backgroundColor: data.sanityCompanyInfo.primarycolor,
                                opacity: "0.7"
                        }}>
                        </div>
                            <h1>{data.sanityPages.pagetitle}</h1>
                            <hr style={{ backgroundColor:  data.sanityCompanyInfo.accentcolor }} />

                    </div>
                </BackgroundImage>
                
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
                        <div className="rightSection" style={{ backgroundColor:  data.sanityCompanyInfo.primarycolor }}>
                            <h2>Our Services</h2>
                            <hr style={{ backgroundColor: data.sanityCompanyInfo.accentcolor }} />
                            <BlockContent blocks={data.sanityPages._rawServices} />
                            <a href="/our-services/" style={{ backgroundColor:data.sanityCompanyInfo.accentcolor }}>View our Services</a>
                        </div>
                    </div>
                    <div className="container pageContent">
                        <div className="row">
                            <BlockContent blocks={data.sanityPages._rawSecondcopy} />
                        </div>
                    </div>
                </div>
            </div>
    </Layout>
</div>
)
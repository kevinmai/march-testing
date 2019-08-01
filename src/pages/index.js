import React from 'react';
import { graphql } from 'gatsby';
import Layout from "../components/layout"
import BlockContent from '../components/block-content'
import BackgroundImage from 'gatsby-background-image'


export const query = graphql`
    query pagesQuery {
        sanityPages(slug: {current: {eq: "home"}}) {
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
                    fluid(maxWidth:1920){
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
`

const IndexPage = ( {data }) => (
  <Layout>
    <div className="container pageContent">
      <div className="row">
        <BlockContent blocks={data.sanityPages._rawFirstcopy}/>
      </div>
    </div>
    <div className="row servicesRow">
      <div className="leftSection">
        <BackgroundImage 
        style={{height: "100%"}}
        fluid={data.sanityPages.serviceimage.asset.fluid}>
        </BackgroundImage>
      </div>
      <div className="rightSection" style={{ backgroundColor: "#" + data.sanityCompanyInfo.secondarycolor }}>
        <h2>Our Services</h2>
        <BlockContent blocks={data.sanityPages._rawServices} />
        <a href="/our-services/" style={{ backgroundColor: "#" + data.sanityCompanyInfo.accentcolor }}>View our Services</a>
      </div>
    </div>
    <div className="container pageContent">
      <div className="row">
        <BlockContent blocks={data.sanityPages._rawSecondcopy} />
      </div>
    </div>
  </Layout>
)

export default IndexPage

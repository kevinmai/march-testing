import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import BackgroundImage from 'gatsby-background-image'
import Form from "../components/form"

export const query = graphql`
    query errorQuery{
        sanityCompanyInfo {
            companyname
            emptypage{
              asset{
                fluid(maxWidth: 1920){
                  ...GatsbySanityImageFluid
                }
              }
            }
            primarycolor{
                hex
            }
            secondarycolor{
                hex
            }
            accentcolor{
                hex
            }
        }
    }

`


const NotFoundPage = ({data}) => (
  <Layout>
    <SEO title="404: Not found" />
    <Form />
    <BackgroundImage
      style={{
        height: "100%",
        backgroundPosition: "center"
      }}
      fluid={data.sanityCompanyInfo.emptypage.asset.fluid}>
        <div className="pageNotFound-bg" style={{
              backgroundColor: data.sanityCompanyInfo.primarycolor.hex,
              opacity: "0.6"
          }}></div>
    <section id="pageNotFound">
      <div className="pageNotFound-inner">
        <h1>We could not find that one</h1>
        <Link to="/" style={{backgroundColor: data.sanityCompanyInfo.accentcolor.hex}}>Go back home</Link>
      </div>
    </section>
    </BackgroundImage>
  </Layout>
)

export default NotFoundPage

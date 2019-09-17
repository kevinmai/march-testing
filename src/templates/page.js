import React from 'react';
import { graphql } from 'gatsby';
import Layout from "../components/layout"
import BlockContent from '../components/block-content'
import BackgroundImage from 'gatsby-background-image'
import { FaPrint } from "react-icons/fa"
import Form from "../components/form"
import Helmet from 'react-helmet'


export const query = graphql`
    query pageQuery($slug: String) {
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
    }
        sanityCompanyInfo {
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


const now = new Date();
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const today = days[now.getDay()];

function printCoupon() {
    if(typeof window !== 'undefined'){
        window.print();
    }
  }

//   function getUrlVars(){
//     var vars = {};
//     if(typeof window !== 'undefined'){
//             var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
//             vars[key] = value;
//         });
//     }
//     console.log(vars)
//     return vars;
// }
//   const city = getUrlVars()["city"];
function getUrlVars(){
    if(typeof window !== 'undefined'){
        var urlParams = new URLSearchParams(window.location.search);
    }
    return urlParams;
  }
  const city = getUrlVars('city');
  const ourServices = "/our-services?" + city;


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
                <div className="innerLeft">
                <div className="pgHeaderBackground" style={{
                        backgroundColor: data.sanityCompanyInfo.primarycolor.hex,
                        opacity: "0.9"
                    }}></div>
                    <h1>{data.sanityPages.pagetitle}</h1>
                    <p>Call This <b>{today}</b> for </p>
                    <p className="coupon">{data.sanityPages.coupon.title}</p> 
                    <p className="couponType">{data.sanityPages.coupon.type}</p>
                    <p className="restrictions">*Restrictions may apply</p>
                    <span className="printCoupon" onClick={printCoupon} style={{ backgroundColor: data.sanityCompanyInfo.accentcolor.hex }}><FaPrint /> <span className="mobileCouponText">Claim Offer</span></span>
                </div>

            </div>
        </BackgroundImage>
        <div className="container pageContent thispage">
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
            <div className="rightSection" style={{ backgroundColor: data.sanityCompanyInfo.primarycolor.hex }}>
                <span className="servicesBlockTitle"><h2>Our Services</h2></span>
                <BlockContent blocks={data.sanityPages._rawServices} />
                <a href={ourServices} style={{ backgroundColor: data.sanityCompanyInfo.accentcolor.hex }}>View our Services</a>
                </div>
            </div>
        <div className="container pageContent">    
            <div className="row">
                <BlockContent blocks={data.sanityPages._rawSecondcopy} />
            </div>
        </div>
    </Layout>
)
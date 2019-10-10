import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from "../components/layout"
import BlockContent from '../components/block-content'
import BackgroundImage from 'gatsby-background-image'
import { FaPrint } from "react-icons/fa"
import Form from "../components/form"
import Helmet from 'react-helmet'
import PortableText from '@sanity/block-content-to-react'
import $ from 'jquery'


export const query = graphql`
    query pagesQuery {
        sanityPages(slug: {current: {eq: "home"}}) {
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
          companyname
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
/* Get CURRENT DAY */
const now = new Date();
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const today = days[now.getDay()];

/* PRINT COUPON */
function printCoupon() {
  if(typeof window !== 'undefined'){
    window.print();
}
}

/* GET THE CURRENT URL */
function getUrlVars(){
  var vars = [], hash;
  if(typeof window !== 'undefined'){
      var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
      for(var i = 0; i < hashes.length; i++)
      {
          hash = hashes[i].split('=');
          vars.push(hash[0]);
          vars[hash[0]] = hash[1];
      }
  }
  return vars;
}
var city = getUrlVars()["city"];
const ourServices = "/our-services?city=" + city;


function ourServicesLink(){
  if (city === undefined) {
      city = "";
      if (typeof window !== 'undefined') {
        $(".ourServices").attr('href', "/our-services/");
    }
  } else if (city === "") {
      city = "";
      if (typeof window !== 'undefined') {
        $(".ourServices").attr('href', "/our-services/");
    }
  } else if (city !== undefined) {
      city = " in " + city;
      if (typeof window !== 'undefined') {
          $(".ourServices").attr('href', ourServices);
      }
  }
}

const IndexPage = ( {data }) => (
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
          <h1 style={{ borderColor: data.sanityCompanyInfo.accentcolor.hex }}>{data.sanityPages.pagetitle}</h1>
          <p>Call This <b style={{color: data.sanityCompanyInfo.accentcolor.hex}}>{today}</b> for </p>
          <p className="coupon">{data.sanityPages.coupon.title}</p>
          <p className="couponType">{data.sanityPages.coupon.type}</p>
          <p className="restrictions">*Restrictions may apply</p>
          <span className="printCoupon" onClick={printCoupon} style={{ backgroundColor: data.sanityCompanyInfo.accentcolor.hex }}><FaPrint /> <span className="mobileCouponText">Claim Offer</span></span>
        </div>
      </div>
    </BackgroundImage>
    <div className="container pageContent homepage">
      <div className="row">
        HELLO THIS IS INDEX
        <PortableText blocks={data.sanityPages._rawFirstcopy} />
      </div>
    </div>
    <div className="row servicesRow">
      <div className="leftSection">
        <BackgroundImage 
        style={{height: "100%"}}
        fluid={data.sanityPages.serviceimage.asset.fluid}>
        </BackgroundImage>
      </div>
      <div className="rightSection" style={{ backgroundColor: data.sanityCompanyInfo.primarycolor.hex }}>
        <span className="servicesBlockTitle"><h2>Our Services</h2></span>
        <hr style={{ backgroundColor: data.sanityCompanyInfo.accentcolor.hex }} />
        <PortableText blocks={data.sanityPages._rawServices} />
        <a className="ourServices" href="" style={{ backgroundColor: data.sanityCompanyInfo.accentcolor.hex }}>View our Services</a>
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

import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from "../components/layout"
import UspSection from "../components/uspSection"
import BlockContent from '../components/block-content'
import BackgroundImage from 'gatsby-background-image'
import { FaPrint, FaStar, FaUserShield, FaRegClock, FaShieldAlt } from "react-icons/fa"
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
            usp1{
              uspTitle
              uspText
            }
            usp2{
                uspTitle
                uspText
            }
            usp3{
                uspTitle
                uspText
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
function changeActive(){
  $(".form").toggleClass("expanded");
  $('body').toggleClass('formExpanded');
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
          <p className="day">Schedule This <b>{today}</b> for </p>
          <p className="coupon">{data.sanityPages.coupon.title}</p>
          <p className="couponType">{data.sanityPages.coupon.type}</p>
          <div className="schedulebtn-container">
            <span className="schedulebtn" style={{backgroundColor: data.sanityCompanyInfo.accentcolor.hex}} onClick={changeActive}>Schedule</span>
            <span className="printCoupon" onClick={printCoupon} style={{ backgroundColor: data.sanityCompanyInfo.accentcolor.hex }}><FaPrint /> <span className="mobileCouponText">Claim Offer</span></span>
          </div>
          <p className="restrictions">*Restrictions may apply</p>
        </div>
      </div>
    </BackgroundImage>
    <UspSection />
    <div className="container pageContent homepage">
      <div className="row">
        <h1>{data.sanityPages.pagetitle}</h1>
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
        <a className="ourServices" href={{ourServices}} style={{ backgroundColor: data.sanityCompanyInfo.accentcolor.hex }}>View our Services</a>
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

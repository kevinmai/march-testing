import React from 'react';
import { graphql } from 'gatsby';
import Layout from "../components/layout"
import BlockContent from '../components/block-content'
import BackgroundImage from 'gatsby-background-image'
import Helmet from 'react-helmet'
import ServiceForm from "../components/serviceForm"
import Form from "../components/form"
import UspSection from "../components/uspSection"
import $ from "jquery"
import { FaPrint, FaPhone} from "react-icons/fa"


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
            usp1{
                uspTitle
                uspText
                icon
            }
            usp2{
                uspTitle
                uspText
                icon
            }
            usp3{
                uspTitle
                uspText
                icon
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
            phone
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
console.log("ourServices: " + ourServices);
console.log("city: " + city);

if(city === null) {
    city = "";
    if(typeof window !== 'undefined'){
        $(".ourServices").attr('href', "/our-services/");
    }
} else if(city === ""){
    city = "";
    if(typeof window !== 'undefined'){
        $(".ourServices").attr('href', "/our-services/");
    }
} else if(city !== undefined){
    city = " in " + city;
    if(typeof window !== 'undefined'){
        $(".ourServices").attr('href', ourServices);
    }
} 
else if(city === undefined){
    if(typeof window !== 'undefined'){
        $(".ourServices").attr('href', "/our-services/");
    }
} 
function printCoupon() {
    if(typeof window !== 'undefined'){
        window.print();
    }
  }
// if(typeof window !== 'undefined'){
//     $(".ourServices").attr('href', ourServices);
// }

const now = new Date();
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const today = days[now.getDay()];
export default ({ data }) => (

<div className="servicePage">
        <Helmet>
            <title>{data.sanityCompanyInfo.companyname} | {data.sanityPages.pagetitle}</title>
        </Helmet>
    <Layout>
            <div className="flexWrapper">
                <Form />
                <div className="serviceRightSide" style={{ backgroundColor:  data.sanityCompanyInfo.accentcolor.hex }}>
                    <div className="innerWrapper" style={{ backgroundColor:  data.sanityCompanyInfo.accentcolor.hex }}>
                    <div className="companyPhone">
                        <a style={{backgroundColor: data.sanityCompanyInfo.secondarycolor.hex }}href={ "tel:" + data.sanityCompanyInfo.phone }><FaPhone /> <span id="number_rewrite">{data.sanityCompanyInfo.phone}</span> </a>
                    </div>
                    <div className="serviceCoupon">
                        <span className="date">Schedule This <b>{today}</b> for </span>
                        <span className="coupon">{data.sanityPages.coupon.title}</span>
                        <span className="couponType">{data.sanityPages.coupon.type}</span>
                        <span className="bottomwrapper">
                            <span className="restrictions">*Restrictions may apply</span>
                            <span onClick={printCoupon} className="printCoupon" style={{ backgroundColor: data.sanityCompanyInfo.secondarycolor.hex }}><FaPrint /> <span className="mobileCouponText">Claim Offer</span></span>
                            </span>
                    </div>
                    <ServiceForm />
                    </div>
                </div>
                <div className="pagewrap">
                <BackgroundImage
                    style={{
                        height: "100%",
                        backgroundPosition: "center",

                    }}
                    fluid={data.sanityPages.headerimage.asset.fluid}>

                    <div className="pageHeader">
                        <div className="overlay" style={{
                                backgroundColor: data.sanityCompanyInfo.primarycolor.hex,
                                opacity: "0.7"
                        }}>
                        </div>
                            <h1>{data.sanityPages.pagetitle} Services {city}</h1>
                            <hr style={{ backgroundColor:  data.sanityCompanyInfo.accentcolor.hex }} />

                    </div>
                </BackgroundImage>
                <div className="row mobile" style={{ backgroundColor: data.sanityCompanyInfo.accentcolor.hex }}>
                        <div className="mobileCoupon">
                            <span className="date">Schedule This <b>{today}</b> for </span>
                            <span className="coupon">{data.sanityPages.coupon.title}</span>
                            <span className="couponType">{data.sanityPages.coupon.type}</span>
                            <span className="bottomwrapper">
                                <span className="restrictions">*Restrictions may apply</span>
                                <span onClick={printCoupon} className="printCoupon" style={{ backgroundColor: data.sanityCompanyInfo.secondarycolor.hex }}><FaPrint /> <span className="mobileCouponText">Claim Offer</span></span> 
                            </span>
                        </div>
                    </div>
                    <UspSection />
                    <div className="container pageContent">
                        <div className="row">
                            <h1>{data.sanityPages.pagetitle}</h1>
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
                        <div className="rightSection" style={{ backgroundColor:  data.sanityCompanyInfo.primarycolor.hex }}>
                            <h2>Our Services</h2>
                            <hr style={{ backgroundColor: data.sanityCompanyInfo.accentcolor.hex }} />
                            <BlockContent blocks={data.sanityPages._rawServices} />
                            <a className="ourServices" href="" style={{ backgroundColor: data.sanityCompanyInfo.accentcolor.hex }}>View our Services</a>
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


import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from "../components/layout"
import BlockContent from '../components/block-content'
import BackgroundImage from 'gatsby-background-image'
import { FaPrint, FaStar, FaUserShield, FaRegClock, FaShieldAlt } from "react-icons/fa"
import Form from "../components/form"
import Helmet from 'react-helmet'
import $ from 'jquery'

export const query = graphql`
    query couponsQuery{
        sanityPages(slug: {current: {eq: "coupons"}}) {
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
        allSanityCoupon{
            edges{
                node{
                    title
                    type
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

const now = new Date();
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const today = days[now.getDay()];

function printCoupon() {
    if(typeof window !== 'undefined'){
        window.print();
    }
  }

/* ADD CITY TO OUR SERVICES LINK */
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

    function changeActive(){
        $(".form").toggleClass("expanded");
        $('body').toggleClass('formExpanded');
      }

const CouponsPage = ({ data }) => (
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
                    <p>Call This <b style={{color: data.sanityCompanyInfo.accentcolor.hex}}>{today}</b> for </p>
                    <p className="coupon">{data.sanityPages.coupon.title}</p>
                    <p className="couponType">{data.sanityPages.coupon.type}</p>
                    <div className="schedulebtn-container">
                    <span className="schedulebtn" 
                        style={{
                            backgroundColor: data.sanityCompanyInfo.accentcolor.hex,
                        }}
                    onClick={changeActive}>Schedule</span>
                    <span className="printCoupon" onClick={printCoupon} style={{ backgroundColor: data.sanityCompanyInfo.accentcolor.hex }}><FaPrint /> <span className="mobileCouponText">Claim Offer</span></span>

                    </div>
                    <p className="restrictions">*Restrictions may apply</p>
                </div>

            </div>
        </BackgroundImage>
        <div className="usp_section" style={{backgroundColor: '#ededed'}}>
            <div className="three-columns">
                <div className="column column1">
                    <FaUserShield style={{fontSize: '4em', color: data.sanityCompanyInfo.primarycolor.hex}}/>
                    <h2>{data.sanityPages.usp1.uspTitle}</h2>
                    <p>{data.sanityPages.usp1.uspText}</p>
                </div>
                <div className="column column2">
                    <FaRegClock style={{fontSize: '4em', color: data.sanityCompanyInfo.primarycolor.hex }}/>
                    <h2>{data.sanityPages.usp2.uspTitle}</h2>
                    <p>{data.sanityPages.usp2.uspText}</p>
                </div>
                <div className="column column3">
                    <FaShieldAlt style={{fontSize: '4em', color: data.sanityCompanyInfo.primarycolor.hex}}/>
                    <h2>{data.sanityPages.usp3.uspTitle}</h2>
                    <p>{data.sanityPages.usp3.uspText}</p>
                </div>
            </div>
        </div>
        <div className="couponsPage">
            <div className="container pageContent">
                <div className="row">
                    <BlockContent blocks={data.sanityPages._rawFirstcopy} />
                </div>
                <div className="row couponsRow">
                    <ul>
                        {data.allSanityCoupon.edges.map(({ node: coupon }) => (
                            <li className="coupon" key={coupon.title} style={{ backgroundColor: data.sanityCompanyInfo.primarycolor.hex }}>
                                <span key={coupon.title} className="couponTitle">{coupon.title}</span>
                                <br />
                                <span key={coupon.type} className="couponType">{coupon.type}</span>
                                <br />
                                <span key={coupon.slug} className="restrictions">*Restrictions may apply. Call office for details.</span>
                            </li>
                        ))}
                    </ul>
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
                    <h2>Our Services</h2>
                    <BlockContent blocks={data.sanityPages._rawServices} />
                    <a className="ourServices" href="" style={{ backgroundColor: data.sanityCompanyInfo.accentcolor.hex }}>View our Services</a>
                </div>
            </div>
        </div>
    </Layout>
)

export default CouponsPage
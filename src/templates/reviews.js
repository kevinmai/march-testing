import React from 'react';
import { graphql } from 'gatsby';
import Image from "gatsby-image"
import Layout from "../components/layout"
import { FaPrint, FaStar, FaUserShield, FaRegClock, FaShieldAlt } from "react-icons/fa"
import BlockContent from '../components/block-content'
import BackgroundImage from 'gatsby-background-image'
import Form from "../components/form"
import UspSection from "../components/uspSection"
import Helmet from 'react-helmet'
import $ from 'jquery'


export const query = graphql`
    query reviewsQuery {
        sanityPages(slug: {current: {eq: "reviews"}}) {
            pagetitle
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
        allSanityReviews{
            edges{
                node{
                    review
                    author
                    review_source {
                        review_source
                        logo {
                          asset {
                            fluid {
                                ...GatsbySanityImageFluid
                              src
                            }
                          }
                        }
                      }
                }
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
        $("p").each(function(){
            var text = $(this).text();
            text = text.replace("[companyname]", "${data.sanityCompanyInfo.companyname}").replace("city", city);
            $(this).text(text); 
            console.log(text);
        });
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
                    <p className="date">Schedule This <b>{today}</b> for </p>
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
                    {/* <p className="restrictions">*Restrictions may apply</p> */}
                    {/* <span className="printCoupon" onClick={printCoupon} style={{ backgroundColor: data.sanityCompanyInfo.accentcolor.hex }}><FaPrint /> <span className="mobileCouponText">Claim Offer</span></span> */}
                </div>

            </div>
        </BackgroundImage>
        <div className="usp_section" style={{backgroundColor: '#ededed'}}>
            <div className="three-columns">
                <div className="column column1">
                    <i className={"fa fa-" + data.sanityPages.usp1.icon} style={{ fontSize: '2em', color: data.sanityCompanyInfo.primarycolor.hex }}/>
                    <h2>{data.sanityPages.usp1.uspTitle}</h2>
                    <p>{data.sanityPages.usp1.uspText}</p>
                </div>
                <div className="column column2">
                    <i className={"fa fa-" + data.sanityPages.usp2.icon} style={{ fontSize: '2em', color: data.sanityCompanyInfo.primarycolor.hex }}/>
                    <h2>{data.sanityPages.usp2.uspTitle}</h2>
                    <p>{data.sanityPages.usp2.uspText}</p>
                </div>
                <div className="column column3">
                    <i className={"fa fa-" + data.sanityPages.usp3.icon} style={{ fontSize: '2em', color: data.sanityCompanyInfo.primarycolor.hex }}/>
                    <h2>{data.sanityPages.usp3.uspTitle}</h2>
                    <p>{data.sanityPages.usp3.uspText}</p>
                </div>
            </div>
        </div>
        <div className="reviewsPage">
            <div className="container pageContent">
                <div className="row">
                    <h1>{data.sanityPages.pagetitle}</h1>
                    <BlockContent blocks={data.sanityPages._rawFirstcopy} />
                </div>
            </div>
            <div className="container">
                <div className="row reviewRow">
                    
                        {data.allSanityReviews.edges.map(({ node: reviews }) => (
                            <div className="review">
                                <p className="reviewText">{reviews.review}</p>
                                <div className="review-meta">
                                    <Image className="review-logo" location=""
                                    fluid={reviews.review_source.logo.asset.fluid}
                                    style={{ height: "40px", width: "40px" }}
                                    className="align-center"
                                    alt="Company Logo"
                                    />
                                    <div className="right-column">
                                        <p className="author">{reviews.author}</p>
                                        <div className="stars"><FaStar style={{ color: '#fcba03' }} /><FaStar style={{ color: '#fcba03' }} /><FaStar style={{ color: '#fcba03' }} /><FaStar style={{ color: '#fcba03' }} /><FaStar style={{ color: '#fcba03' }} /></div>
                                    
                                        
                                    </div>
                                </div>
                            </div>
                        ))}
                    
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
                    <hr style={{backgroundColor: data.sanityCompanyInfo.accentcolor.hex }} />
                    <BlockContent blocks={data.sanityPages._rawServices} />
                    <a className="ourServices" href="" style={{ backgroundColor: data.sanityCompanyInfo.accentcolor.hex }}>View our Services</a>
                </div>
            </div>
            <div className="container pageContent bottomContent">
                <div className="row">
                    <BlockContent blocks={data.sanityPages._rawSecondcopy} />
                </div>
            </div>
        </div>
    </Layout>
)
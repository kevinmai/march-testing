/*** IMPORTS  ****/
import  React from 'react'
import { graphql } from 'gatsby'
import Layout from "../components/layout"
import Helmet from 'react-helmet'
import { Link } from "gatsby"
import BlockContent from '../components/block-content'
import BackgroundImage from 'gatsby-background-image'
import UspSection from "../components/uspSection"
import { FaPrint, FaStar, FaUserShield, FaRegClock, FaShieldAlt } from "react-icons/fa"
import Form from "../components/form"
import PortableText from '@sanity/block-content-to-react'
import $ from 'jquery'

/**** GRAPHQL QUERY *****/
export const query = graphql`
    query ourservicespageQuery {
        sanityPages(slug: {current: {eq: "our-services"}}) {
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
            _rawFirstcopy(resolveReferences: { maxDepth: 10 })
            firstcopy {
            sanityChildren {
                marks
                text
                _type
                _key
            }
            list
            _type
            _key
            style
            }
            
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

/***** GET CURRENT DAY *****/
const now = new Date();
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const today = days[now.getDay()];


/***** FUNCTION TO PRINT OUT COUPONS *****/
function printCoupon() {
    if(typeof window !== 'undefined'){
        window.print();
    }
}
/***** FUNCTION TO GET THE CITY PARAMETER FROM URL *****/
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

if(city === null) {
    city = "";
} else if(city === ""){
    city = "";
} else if(city !== undefined){
    city = " in " + city;
} 

var city = getUrlVars()["city"];
  const reviews = "/reviews?city=" + city;
  
    if (city === undefined) {
        city = "";
        if (typeof window !== 'undefined') {
          $(".reviews").attr('href', "/reviews/");
      }
    } else if (city === "") {
        city = "";
        if (typeof window !== 'undefined') {
          $(".reviews").attr('href', "/reviews/");
      }
    } else if (city !== undefined) {
        city = " in " + city;
        if (typeof window !== 'undefined') {
            $(".reviews").attr('href', reviews);
        }
    }
 


/***** ADD CITY TO URLS IN PAGE *****/
function addCity(){
    if(typeof window !== 'undefined' && city !== undefined){
        $('div.pageContent a').attr('href', function(i, href){
            city= getUrlVars()['city'];
            return href + "?city=" +  city; 
        });
    }  
}


/***** FUNCTION FOR BLOCK CONTENT LINKS *****/
const serializers = {
    marks: {
        internalLink: ({mark, children}) => {
            const {slug = {}} = mark
            const href = `/{slug.current}?city={city}`
            return <Link to={href}>{children}</Link>
          }
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
                <div className="innerLeft" >
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
                    <p className="restrictions">*Restrictions may apply</p>

                    {
                        // IF COUPON IS PRINTABLE -> SHOW PRINT BUTTON
                        // data.sanityPages.coupon.printable  && <span className="printCoupon" onClick={printCoupon} style={{ backgroundColor: data.sanityCompanyInfo.accentcolor.hex }}><FaPrint /> <span className="mobileCouponText">Claim Offer</span></span> }
                    }

                </div>

            </div>
        </BackgroundImage>

        <div className="ourServicesPage">
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
            <div className="container pageContent" >
                <div className="row firstCopy">
                        <h1>{data.sanityPages.pagetitle}</h1>

                        <PortableText blocks={data.sanityPages._rawFirstcopy} serializers={serializers} onClick={addCity()} />
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
                <span className="rightSectionTitle"><h2>Customer Reviews</h2></span>
                    <hr style={{ backgroundColor: data.sanityCompanyInfo.accentcolor.hex }} />
                    <FaStar style={{ color: '#fcba03' }} /><FaStar style={{ color: '#fcba03' }} /><FaStar style={{ color: '#fcba03' }} /><FaStar style={{ color: '#fcba03' }} /><FaStar style={{ color: '#fcba03' }} />
                    <BlockContent blocks={data.sanityPages._rawServices} />
                    <a className="reviews" href="/reviews" style={{ backgroundColor: data.sanityCompanyInfo.accentcolor.hex }}>View More Reviews</a>
                </div>
            </div>
            <div className="container pageContent">
                <div className="row">
                    <BlockContent blocks={data.sanityPages._rawSecondcopy} />
                </div>
            </div>
        </div>
    </Layout>
)

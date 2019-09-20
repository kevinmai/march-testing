/*** IMPORTS  ****/
import  React from 'react'
import { graphql } from 'gatsby'
import Layout from "../components/layout"
import Helmet from 'react-helmet'
import { Link } from "gatsby"
import BlockContent from '../components/block-content'
import BackgroundImage from 'gatsby-background-image'
import { FaPrint } from "react-icons/fa"
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
                printable
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
            cities
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
console.log(city);

if(city === null) {
    city = "";
} else if(city === ""){
    city = "";
} else if(city !== undefined){
    city = " in " + city;
} 
 


/***** ADD CITY TO URLS IN PAGE *****/
function addCity(){
    if(typeof window !== 'undefined'){
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
            return <Link to={href }>{children}</Link>
          }
      }
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

                    <h1 style={{ borderColor: data.sanityCompanyInfo.accentcolor.hex }}>{data.sanityPages.pagetitle} {city}</h1>
                    <p className="date">Call This <b style={{color: data.sanityCompanyInfo.accentcolor.hex}}>{today}</b> for </p>
                    <p className="coupon">{data.sanityPages.coupon.title}</p>
                    <p className="couponType">{data.sanityPages.coupon.type}</p>
                    <p className="restrictions">*Restrictions may apply</p>

                    {
                        // IF COUPON IS PRINTABLE -> SHOW PRINT BUTTON
                        // data.sanityPages.coupon.printable  && <span className="printCoupon" onClick={printCoupon} style={{ backgroundColor: data.sanityCompanyInfo.accentcolor.hex }}><FaPrint /> <span className="mobileCouponText">Claim Offer</span></span> }
                    }

                    <span className="printCoupon" onClick={printCoupon} style={{ backgroundColor: data.sanityCompanyInfo.accentcolor.hex }}><FaPrint /> <span className="mobileCouponText">Claim Offer</span></span>
                </div>

            </div>
        </BackgroundImage>
        <Form />
        <div className="ourServicesPage">
            <div className="container pageContent" >
                <div className="row firstCopy">
                        <PortableText blocks={data.sanityPages._rawFirstcopy} serializers={serializers}  />
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
                    <span className="rightSectionTitle"><h2>Our Services</h2></span>
                    <hr style={{ backgroundColor: data.sanityCompanyInfo.accentcolor.hex }} />
                    <BlockContent blocks={data.sanityPages._rawServices} />
                </div>
            </div>
        </div>
    </Layout>
)

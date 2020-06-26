import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { FaUserShield, FaRegClock, FaShieldAlt } from "react-icons/fa"

export default () => (
    <StaticQuery query={ graphql`
    query uspQuery($slug: String) {
        sanityPages(slug: {current: {eq: $slug}}) {
            pagetitle
            slug{
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
            cities
        }
    }
`}

    render={ data => (
    
        <div className="usp_section" style={{backgroundColor: '#ededed'}}>
            <div className="three-columns">
                <div className="column column1">
                    <FaUserShield style={{fontSize: '3em', color: data.sanityCompanyInfo.primarycolor.hex}}/>
                    <h2>{data.sanityPages.usp1.uspTitle}</h2>
                    <p>{data.sanityPages.usp1.uspText}</p>
                </div>
                <div className="column column2">
                    <FaRegClock style={{fontSize: '3em', color: data.sanityCompanyInfo.primarycolor.hex }}/>
                    <h2>{data.sanityPages.usp2.uspTitle}</h2>
                    <p>{data.sanityPages.usp2.uspText}</p>
                </div>
                <div className="column column3">
                    <FaShieldAlt style={{fontSize: '3em', color: data.sanityCompanyInfo.primarycolor.hex}}/>
                    <h2>{data.sanityPages.usp3.uspTitle}</h2>
                    <p>{data.sanityPages.usp3.uspText}</p>
                </div>
            </div>
        </div>

)}
/>
)


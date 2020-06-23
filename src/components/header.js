import { StaticQuery, graphql, Link } from "gatsby"
import Image from "gatsby-image"
import React from "react"
import { FaCalendarAlt } from 'react-icons/fa'
import { FaPhone } from 'react-icons/fa'
import $ from "jquery"


function changeActive(){
  $(".form").toggleClass("expanded");
  $('body').toggleClass('formExpanded');
}

export default () => (
  <StaticQuery query={ graphql`
          query CompanyQuery {
            sanityCompanyInfo {
              phone
              companyTagline
              primarycolor{
                hex
            }
            secondarycolor{
                hex
            }
            accentcolor{
                hex
            }
              logo {
                asset {
                  fluid(maxWidth: 700) {
                    ...GatsbySanityImageFluid
                  }
                }
              }
            }
          }
        `} 

        
        render={data => (
          <header>
              <div className="header-inner">
              <Image location=""
                  fluid={data.sanityCompanyInfo.logo.asset.fluid}
                  style={{ height: "auto", width: "200px" }}
                  className="align-center"
                  alt="Plumbit Logo"
                />
                <div className="headerBtns">
                  <span className="companyTagline" style={{color: data.sanityCompanyInfo.secondarycolor.hex}}>{data.sanityCompanyInfo.companyTagline}</span>
                  <div className="btns-wrap">
                    <span className="headerbtn schedule" onClick={changeActive} 
                    style={{ backgroundColor: data.sanityCompanyInfo.secondarycolor.hex, borderColor: data.sanityCompanyInfo.secondarycolor.hex }}
                    > <FaCalendarAlt /> Schedule</span>
                    <a className="headerbtn phone" style={{ backgroundColor: data.sanityCompanyInfo.accentcolor.hex, borderColor: data.sanityCompanyInfo.accentcolor.hex}} href={"tel:" + data.sanityCompanyInfo.phone}><FaPhone /> {data.sanityCompanyInfo.phone}</a>
                  </div>
                </div>
              </div>
          </header>
        )}
  />
)





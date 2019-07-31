import { StaticQuery, graphql, Link } from "gatsby"
import Image from "gatsby-image"
import React from "react"
import { FaCalendarAlt } from 'react-icons/fa'
import { FaPhone } from 'react-icons/fa'
import $ from "jquery"


function changeActive(){
  $(".form").toggleClass("expanded");
}

export default () => (
  <StaticQuery query={ graphql`
          query CompanyQuery {
            sanityCompanyInfo {
              phone
              primarycolor
              secondarycolor
              accentcolor
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
            <div className="">
              <div className="header-inner">
                <Image
                  fluid={data.sanityCompanyInfo.logo.asset.fluid}
                  style={{ height: "75px", width: "200px" }}
                  className="align-center"
                  alt="Plumbit Logo"
                />
                <div className="headerBtns">
                  <span className="headerbtn schedule" onClick={changeActive} > <FaCalendarAlt /> Schedule</span>
                  <a className="headerbtn phone" href={"tel:" + data.sanityCompanyInfo.phone}><FaPhone /> {data.sanityCompanyInfo.phone}</a>
                </div>
              </div>
            </div>
          </header>
        )}
  />
)





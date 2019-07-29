import { StaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import React from "react"
import { FaCalendarAlt } from 'react-icons/fa'
import { FaPhone } from 'react-icons/fa'

export default () => (
  <StaticQuery query={ graphql`
          query CompanyQuery {
            sanityCompanyInfo {
              phone
              primarycolor
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
            <div class="">
              <div class="header-inner">
                <Image
                  fluid={data.sanityCompanyInfo.logo.asset.fluid}
                  style={{ height: "75px", width: "200px" }}
                  className="align-center"
                  alt="Plumbit Logo"
                />
                <div class="headerBtns">
                  <a class="headerbtn schedule" href="#"><FaCalendarAlt /> Schedule</a>
                  <a class="headerbtn phone" href="#"><FaPhone /> {data.sanityCompanyInfo.phone}</a>
                </div>
              </div>
            </div>
          </header>
        )}
        />
)
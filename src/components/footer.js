import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Footer = () => {
  const { site } = useStaticQuery(
    graphql`
    query{
        sanityCompanyInfo {
            companyname
            licenses
        }
      }
    `
  )

  return (
    <footer className="footer">
        <div className="container">
          <p>&copy; {site.sanityCompanyInfo.companyname} | Marketing by <a href="http://vitalstorm.com/" target="_blank" rel="noopener noreferrer">VitalStorm Marketing Inc.</a></p> 
          
        </div>
        <script type="text/javascript">
          {`var SETUP_VS_LP = function(){
              INIT_VS_LP({
                  env: 'prod'
              });
          };`}
              </script>
              <script src="https://s3.amazonaws.com/vs.static-files/vs_lp_conv_bundle.js"  async defer onload="SETUP_VS_LP();"></script>
      </footer>
  )
}

export default Footer




         
            
            
            
            
            

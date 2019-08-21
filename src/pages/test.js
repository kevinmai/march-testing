import React from 'react';
import { graphql } from 'gatsby';

import PortableText from '@sanity/block-content-to-react'


export const query = graphql`
    query testQuery {
        sanityPages(slug: {current: {eq: "our-services"}}) {
            pagetitle
            slug {
                current
            }
            _rawFirstcopy
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
            primarycolor
            secondarycolor
            accentcolor
        }
    }
`

const serializers = {
  marks: {
    internalLink: ({mark, children}) => {
      const {slug = {}} = mark
      const href = `/${slug.current}`
      return <a href={href}>{children}</a>
    }
  }
}

const Body = (data) => (
  <PortableText 
    blocks={data.sanityPages._rawFirstCopy} 
    serializers={serializers} 
  />
  )

  export default Body
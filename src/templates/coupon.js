import React from 'react';
import { graphql } from 'gatsby';

export const query = graphql`
    query couponQuery($slug: String) {
        sanityCoupon(slug: {current: {eq: $slug}}) {
            title
        }
    }
`

export default ({ data }) => (
    <div>
        <h1>{data.sanityCoupon.title}</h1>
    </div>
)
import React from "react"
import { graphql, StaticQuery } from 'gatsby'
import $ from "jquery"
import { FaPrint } from "react-icons/fa"
import { FaPhone } from 'react-icons/fa'

const now = new Date();
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const today = days[now.getDay()];

function printCoupon() {
    window.print();
}

export default () => (
    <StaticQuery query={
        graphql`
    query formQuery($slug: String){
        sanityPages(slug: {current: {eq: $slug}}){
            coupon {
                title
                type
            }
        }
        sanityCompanyInfo {
            phone
            primarycolor
            secondarycolor
            accentcolor
        }
    }
`}

        render={data => (
            <>
            <div className="serviceRightSide" style={{ backgroundColor:  data.sanityCompanyInfo.accentcolor }}>
                <div className="innerWrapper" style={{ backgroundColor:  data.sanityCompanyInfo.accentcolor }}>
                    <div className="companyPhone">
                        <a style={{backgroundColor: data.sanityCompanyInfo.primarycolor }}href={ "tel:" + data.sanityCompanyInfo.phone }><FaPhone /> {data.sanityCompanyInfo.phone} </a>
                    </div>
                    <div className="serviceCoupon">
                        <span className="date">Call This <b>{today}</b> for </span>
                        <span className="coupon">{data.sanityPages.coupon.title}</span>
                        <span className="couponType">{data.sanityPages.coupon.type}</span>
                        <span className="bottomwrapper">
                            <span className="restrictions">*Restrictions may apply</span>
                            <span onClick={printCoupon} className="printCoupon" style={{ backgroundColor: data.sanityCompanyInfo.primarycolor }}><FaPrint /> <span className="mobileCouponText">Claim Offer</span></span>
                            </span>
                    </div>
                    <div className="form serviceForm">
                        <h2>Schedule Service</h2>
                        <form>
                            <input type="text" name="name" placeholder="Name*" required />
                            <input type="email" name="email" placeholder="Email Address*" required />
                            <input type="tel" name="phone" placeholder="Phone Number" />
                            <textarea name="serviceneeded" placeholder="Service Needed*" required />
                            <input type="submit" value="Submit" style={{backgroundColor: data.sanityCompanyInfo.secondarycolor }}/>
                        </form>
                    </div>
                </div>
            </div>
        </>
        )}
    />
)


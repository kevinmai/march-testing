import React from "react"
import { FaTimesCircle } from 'react-icons/fa'
import $ from "jquery"
import { graphql, StaticQuery } from 'gatsby'

function changeActive() {
    $(".form").toggleClass("expanded");
    console.log("clicked");
}

export default () => (

     <StaticQuery query={
        graphql`
    query queryForm{
        sanityCompanyInfo {
            primarycolor
            secondarycolor
            accentcolor
        }
    }
`}
        render={data => (
            <>
    <div className="form">
        <h2>Schedule Service</h2>
        <span className="closeForm" onClick={changeActive}><FaTimesCircle style={{fill: data.sanityCompanyInfo.primarycolor }} /></span>
        <form>
            <input type="text" name="name" placeholder="Name*" required />
            <input type="email" name="email" placeholder="Email Address*" required />
            <input type="tel" name="phone" placeholder="Phone Number" />
            <textarea name="serviceneeded" placeholder="Service Needed*" required />
            <input type="submit" value="Submit" style={{backgroundColor: data.sanityCompanyInfo.secondarycolor }} />
        </form>
    </div>

</>
        )}
/>
)
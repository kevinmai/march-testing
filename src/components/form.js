import React from "react"
import { FaTimesCircle } from 'react-icons/fa'
import $ from "jquery"

function changeActive() {
    $(".form").toggleClass("expanded");
}

export default () => (
    <div className="form">
        <h2>Schedule Service</h2>
        <span className="closeForm" onClick={changeActive}><FaTimesCircle /></span>
        <form>
            <input type="text" name="name" placeholder="Name*" required />
            <input type="email" name="email" placeholder="Email Address*" required />
            <input type="tel" name="phone" placeholder="Phone Number" />
            <textarea name="serviceneeded" placeholder="Service Needed*" required />
            <input type="submit" value="Submit" />
        </form>
    </div>
)
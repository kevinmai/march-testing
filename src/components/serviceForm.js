import React from "react"
import { graphql, StaticQuery } from 'gatsby'
import { FaPhone, FaEnvelope, FaPrint } from 'react-icons/fa'
import $ from "jquery"


const now = new Date();
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const today = days[now.getDay()];

function printCoupon() {
    if(typeof window !== 'undefined'){
        window.print();
    }
}
export default class ContactForm extends React.Component {
state = {
    name: "",
    honeypot: "",
    tel: "",
    message: "",
  }

  handleInputChange = event => {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value,
    })
  }

  changeActive = event =>{
    $(".form").toggleClass("expanded");
    $('body').toggleClass("formExpanded");
  }

  handleSubmit = event => {
    event.preventDefault();
    

    var form = $("#form-metrics");
    var url = form.attr('action');

    $.ajax({
      type: "POST",
           url: url,
           data: form.serialize(), // serializes the form's elements.
           success: function(data)
           {
               //alert(data); // show response from the php script.
           }
    });

    $(".form-message").text('Thank you for your submission, we will be with you shortly.').css('display', 'block');
    $('.inputfield').val("");
  }
  render() {
    
    return (
      <>


    <StaticQuery query={
        graphql`
            query serviceFormQuery($slug: String){
                sanityPages(slug: {current: {eq: $slug}}){
                    coupon {
                        title
                        type
                    }
                }
                sanityCompanyInfo {
                    phone
                    primarycolor{
                        hex
                    }
                    secondarycolor{
                        hex
                    }
                    accentcolor{
                        hex
                    }
                }
            }
        `}

render={data => (
    <>
                    <div className="serviceForm">
                        <h2>Schedule Service</h2>
                        <form id="form-metrics" onSubmit={this.handleSubmit} action="https://metrics.vitalstorm.com/email_form_submission/MGYyZmE4Zjc2N2UwNTY2NzNkMzEwYzYyMjU4NTFkNTk/" method="POST">
                            <input id="mail-name" className="inputfield" type="text" name="name" value={this.state.name} onChange={this.handleInputChange} placeholder="Enter your full name" required />
                            <input id="mail-email" className="inputfield" type="text" name="honeypot" value={this.state.honeypot} onChange={this.handleInputChange} placeholder="Email address" minLength="3" maxLength="64" required />
                            <input id="mail-honey" className="inputfield" type="text" name="email" />
                            <input id="mail-tel" className="inputfield" name="tel" value={this.state.tel} type="tel" onChange={this.handleInputChange} placeholder="(123) 456-7890" required />
                            <input id="mail-message" className="inputfield" type="text" value={this.state.message} onChange={this.handleInputChange} name="message" placeholder="Request a service" required />
                            <input type="hidden" name="gclid" value="" />
                            <input type="hidden" name="vsref" value="6028420262" />
                            <div className="ajax-button">
                                <button id="mail-submit" type="submit" name="mail-submit" style={{backgroundColor: data.sanityCompanyInfo.secondarycolor.hex}} >Send Request</button> 
                            </div>
                            <p className="form-message"><FaEnvelope /> </p>
                            </form>
                    </div>
        </>
        )}
    />
    </>
)
}
}
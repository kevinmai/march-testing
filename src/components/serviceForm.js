import React from "react"
import $ from "jquery"
import { StaticQuery, graphql } from "gatsby"
import { FaTimesCircle, FaEnvelope, FaPhone } from 'react-icons/fa'
import Image from "gatsby-image"

const FormMessage = props => {
  let message = 'Thank you for your submission, we will be with you shortly.';
  let style = {};
  if(props.submitted){
    message = 'Thank you for your submission, we will be with you shortly.';
    style.display = 'block';
  }
  return (
    <p className="form-message" style={style}>
      {message}
      <FaEnvelope />
    </p>
  );
};


export default class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.changeActive = this.changeActive.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      name: "",
      honeypot: "",
      tel: "",
      message: "",
      vsref: "3362816333",
      gclid: "",
      submitted: false,
      formAction: 'https://metrics.vitalstorm.com/email_form_submission/0875cb26-0eb8-4d3d-890b-46ced9db821f/'
    };
  }
  handleInputChange(event){
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value,
    })
  }
  changeActive(event){
    $(".form").toggleClass("expanded");
    $("body").toggleClass("formExpanded");
    console.log("expanded");

  }
  handleSubmit(event){
    event.preventDefault();
    const fieldData = new URLSearchParams({
      name: this.state.name,
      honeypot: this.state.honeypot,
      tel: this.state.tel,
      message: this.state.message,
      vsref: this.state.vsref,
      gclid: this.state.gclid,
    });
    $.ajax({
      type: "POST",
       url: this.state.formAction,
       data:  fieldData.toString(), // serializes the form's elements.
       success: data => {
          this.setState({
            name: "",
            honeypot: "",
            tel: "",
            message: "",
            vsref: "",
            gclid: "",
            submitted: true
          });
       }
    });
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
                        <form ref={this.formRef} id="form-metrics" onSubmit={this.handleSubmit} action={this.state.formAction} method="POST">
                              <input id="mail-name" className="inputfield" type="text" name="name" value={this.state.name} onChange={this.handleInputChange} placeholder="Enter your full name" required />
                              <input id="mail-email" className="inputfield" type="text" name="honeypot" value={this.state.honeypot} onChange={this.handleInputChange} placeholder="Email address" minLength="3" maxLength="64" required />
                              <input id="mail-honey" className="inputfield" type="text" name="email" />
                              <input id="mail-tel" className="inputfield" name="tel" value={this.state.tel} type="tel" onChange={this.handleInputChange} placeholder="(123) 456-7890" required />
                              <input id="mail-message" className="inputfield" type="text" value={this.state.message} onChange={this.handleInputChange} name="message" placeholder="Request a service" required />
                              <input type="hidden" name="gclid" value="" />
                              <input type="hidden" name="vsref" value={this.state.vsref} />
                              <div className="ajax-button">
                                  <button id="mail-submit" type="submit" name="mail-submit" style={{backgroundColor: data.sanityCompanyInfo.primarycolor.hex}}>Send Request</button>
                              </div>
                              <FormMessage submitted={this.state.submitted} />
                            </form>
                    </div>
        </>
        )}
    />
    </>
)
}
}
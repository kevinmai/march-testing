import React from "react"
import { FaTimesCircle } from 'react-icons/fa'
import $ from "jquery"
import { graphql, StaticQuery } from 'gatsby'
import Helmet from 'react-helmet'

function changeActive() {
    $(".form").toggleClass("expanded");
    console.log("clicked");
}

export default () => (

     <StaticQuery query={
        graphql`
    query queryForm{
        sanityCompanyInfo {
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
            <Helmet>
            <script>{`
                $(document).ready(function() {
                    $('input[name="mail-submit"]').click(function() {
                    })
                    // empty name field
                    $('input[name="name"]').blur(function()
                        {
                                if( !$.trim(this.value).length ) {
                                        $(".form-message").html("<span class='form-error animated fadeInUp'>Please enter your full name</span>");
                                        $("#form-metrics input[name='name']").addClass('error-border');
                                } else {
                                        $("#form-metrics input[name='name']").removeClass('error-border');
                                        $(".form-message").html("<span class='form-error animated fadeInUp'></span>");
                                }
                        });
                        // empty phone field
                        $('input[name="tel"]').blur(function()
                            {
                                    if( !$.trim(this.value).length ) {
                                            $(".form-message").html("<span class='form-error animated fadeInUp'>Please enter your phone number</span>");
                                            $("#form-metrics input[name='tel']").addClass('error-border');
                                    } else {
                                            $("#form-metrics input[name='tel']").removeClass('error-border');
                                            $(".form-message").html("<span class='form-error animated fadeInUp'></span>");
                                    }
                            });
                            // empty service field
                            $('input[name="message"]').blur(function()
                                {
                                        if( !$.trim(this.value).length ) {
                                                $(".form-message").html("<span class='form-error animated fadeInUp'>Please request a service</span>");
                                                $("#form-metrics input[name='message']").addClass('error-border');
                                        } else {
                                                $("#form-metrics input[name='message']").removeClass('error-border');
                                                $(".form-message").html("<span class='form-error animated fadeInUp'></span>");
                                        }
                                });


                                // email- validation
                                function validateEmail(email) {
                                    const re = /\S+@\S+\.\S+/;
                                    return re.test(String(email).toLowerCase());
                                }
                                function validateE() {
                                const email = $("input#mail-email").val();
                                if (validateEmail(email)) {
                                        $("#form-metrics input[name='honeypot']").removeClass('error-border');
                                    return true;
                                }/* else if (email === '') {
                                        $(".form-message").css('display: none');
                                    }*/
                                    else {
                                    $(".form-message").html("<span class='form-error animated fadeInUp'>Please enter a valid email</span>");
                                        $("#form-metrics input[name='honeypot']").addClass('error-border');
                                }
                                return false;
                                }
                                // email- validation

                                $("button#mail-submit").bind("click", validateE);

                $('form').submit(function(event){
                        event.preventDefault();
                                const post_url = $(this).attr("action");
                                const form_data = $(this).serialize();

                                $.post( post_url, form_data, function(response) {
                                                const responseString = (typeof response === 'object')?response.responseText:response;
                                                const jqueryresponseTemplate = $('<template>'+responseString+'</template>');
                                                const jquerymainResponseHtml = $(jqueryresponseTemplate.get(0).content).find('main');
                                                if(!jquerymainResponseHtml || jquerymainResponseHtml.length < 1 ){
                                                    jquerymainResponseHtml  = $('<p>No Valid Response Returned</p>');
                                                    $('.form-message').html(jquerymainResponseHtml);
                                                }else{
                                                    $('.form-message').fadeIn();
                                                    $('.form-message').html(jquerymainResponseHtml);
                                                    $( 'form' ).each(function(){
                                                            this.reset();
                                                    });
                                                    $('input[name="name"], input[name="honeypot"], input[name="tel"], input[name="message"]').removeClass( "input-error" );
                                                }

                                },"html");


                });

            });
            `}
            </script>
            </Helmet>
                
            <div className="form">
                <h2 style={{color: data.sanityCompanyInfo.primarycolor.hex}}>Schedule Service</h2>
                <span className="closeForm" onClick={changeActive}><FaTimesCircle style={{fill: data.sanityCompanyInfo.primarycolor.hex }} /></span>
                <form id="form-metrics" className="animated" action="https://metrics.vitalstorm.com/email_form_submission/MGYyZmE4Zjc2N2UwNTY2NzNkMzEwYzYyMjU4NTFkNTk/" method="post">
                    <input id="mail-name" type="text" name="name" placeholder="Enter your full name" required />
                    <input id="mail-email"  type="text" name="honeypot" placeholder="Email address" minlength="3" maxlength="64" required />
                    <input id="mail-honey" type="text" name="email" />
                    <input id="mail-tel" name="tel" type="tel" placeholder="(123) 456-7890" pattern=".{0}|.{14,}" required title="Must have 14 characters" />
                    <input id="mail-message" type="text" name="message" placeholder="Request a service" required />
                    <input type="hidden" name="gclid" value="" />
                    <input type="hidden" name="vsref" value="" />
                    <div className="ajax-button">
                        <button style={{backgroundColor: data.sanityCompanyInfo.secondarycolor.hex }}id="mail-submit" type="submit" name="mail-submit">Send Request</button>
                    </div>
                    <p className="form-message"></p>
                </form>
            </div>


</>
)}
/>
)
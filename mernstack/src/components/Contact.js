/* eslint-disable */

import React, {
    Component
}
from 'react';
import '../css/Contact.css';
import { Link } from 'react-router';
class Contact extends Component {
    
  render() {
    return (
        <div>
            <section id="contact">
                <div className="container">
                    <div className="row">
                        <div className="about_our_company">
                            <h1 styleName="color:#fff;">Write Your Message</h1>
                            <div className="titleline-icon"></div>
                            <p styleName="color:#fff;">Generic Contact Form (Functionality still not implemented) </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8">
                            <form name="sentMessage" id="contactForm" novalidate="" action="/contact">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Your Name *" id="name" required="" data-validation-required-message="Please enter your name." />
                                            <p className="help-block text-danger"></p>
                                        </div>
                                        <div className="form-group">
                                            <input type="email" className="form-control" placeholder="Your Email *" id="email" required="" data-validation-required-message="Please enter your email address." />
                                            <p className="help-block text-danger"></p>
                                        </div>
                                        <div className="form-group">
                                            <input type="tel" className="form-control" placeholder="Your Phone *" id="phone" required="" data-validation-required-message="Please enter your phone number." />
                                            <p className="help-block text-danger"></p>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <textarea className="form-control" placeholder="Your Message *" id="message" required="" data-validation-required-message="Please enter a message."></textarea>
                                            <p className="help-block text-danger"></p>
                                        </div>
                                    </div>
                                    <div className="clearfix"></div>
                                    <div className="col-lg-12 text-center">
                                        <div id="success"></div>
                                        <button type="submit" className="btn btn-xl get">Send Message</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-4">
                            <p styleName="color:#ffffff;">
                                <strong><i className="fa fa-map-marker"></i> Address</strong><br />
                                832 Oak Grove Rd. Apt. 201
                                Concord, CA 94518
                            </p>
                            <p styleName="color:#ffffff;"><strong><i className="fa fa-phone"></i> Phone Number</strong><br />
                                (859) 630-4678</p>
                            <p styleName="color:#ffffff;">
                                <strong><i className="fa fa-envelope"></i>  Email Address</strong><br />
                                steinkampc@gmail.com</p>
                            <p></p>
                        </div>
                    </div>
                </div>
            </section>
	    </div>
    );
  }
}

export default Contact;

    
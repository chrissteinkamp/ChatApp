/* eslint-disable */

import React, {
    Component
}
from 'react';
import '../css/About.css';

class About extends Component {
    
  render() {
    return (
        <div>
            <div className="jumbotron text-center jumbotron-opacity">
              <h1>About</h1>
              <p>This is a chat room application that is currently being developed. It was developed just as a learning experience.</p> 
              <p>The application is built with the MERN (Mongo, Express, React, Node) stack. </p>
            </div>
    
            <div className="container">
              <div className="row row-padded">
                <div className="col-sm-3">
                  <h3>Mongo</h3>
                  <p>MongoDB is a free and open-source cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with schemas.</p>
                </div>
                
                <div className="col-sm-3">
                  <h3>Express</h3>
                  <p>Express.js is a Node.js web application server framework, designed for building single-page, multi-page, and hybrid web applications. It is the de facto standard server framework for node.js.</p>
                </div>
                
                <div className="col-sm-3">
                  <h3>React</h3> 
                  <p>React (sometimes styled React.js or ReactJS) is an open-source JavaScript library for building user interfaces. It is maintained by Facebook, Instagram and a community of individual developers and corporations.</p>
                </div>
                
                <div className="col-sm-3">
                  <h3>Node</h3> 
                  <p>Node.js is a platform built on Chrome's JavaScript runtime for easily building fast and scalable network applications. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient, perfect for data-intensive real-time applications that run across distributed devices.</p>
                </div>
              </div>
            </div>
        </div>
    );
  }
}

export default About;

    
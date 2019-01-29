/* eslint-disable */

import React, {
    Component
}
from 'react';
import axios from 'axios';
import {browserHistory, Link} from 'react-router';
import { login, logout, isLoggedIn } from '../utils/AuthService';

class HomePage extends Component {
        //this.userLogin = this.userLogin.bind(this);
    
   /*userLogin() {
      var user = document.getElementById("inputUsername").value;
      var pass = document.getElementById("inputPassword").value;
      debugger;
      var request = axios.post(this.props.url, {
          username: user,
          password: pass
      })
      request.then(function (response) {
          if(response.data.success){
              browserHistory.push('/chat');
          } else {
              browserHistory.push('/');
              alert(response.data.message);
          }
      })
      .catch(function (error) {
                console.error(error);
            });
    }*/
    
  render() {
    return (
        <div>
            <div className="jumbotron jumbo-width">
                <div className="container">
                    <h1>Welcome to Chat App!</h1>
                    <p>This is a chat application that is currently under development. Please Login and you will be directed to the latest version.</p>
                    <p><Link className="btn btn-primary btn-lg" to="/about" role="button">Learn more &raquo;</Link></p>
                </div>
            </div>
        </div>
    );
  }
}

export default HomePage;
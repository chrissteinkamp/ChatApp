/* eslint-disable */

import React, {
    Component
}
from 'react';
import '../css/Profile.css';

class Profile extends Component {
    
  render() {
    var user = JSON.parse(localStorage.getItem('User'));
    return (
        <div className="container">
            <div className="row">
                <div className="col-xs-12 col-sm-6 col-md-6">
                    <div className="well well-sm">
                        <div className="row">
                            <div className="col-sm-6 col-md-4">
                                <img src="http://placehold.it/380x500" alt="" className="img-rounded img-responsive" />
                            </div>
                            <div className="col-sm-6 col-md-8">
                                <h4>{user.nickname}</h4>
                                <small><cite title="San Francisco, USA">San Francisco, USA <i className="glyphicon glyphicon-map-marker">
                                </i></cite></small>
                                    <i className="glyphicon glyphicon-envelope"></i>{user.email}
                                    <br />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
  }
}

export default Profile;

    